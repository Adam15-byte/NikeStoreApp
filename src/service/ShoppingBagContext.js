import React, { createContext, useState, useEffect, useCallback } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  interpolateColor,
} from "react-native-reanimated";
import { COLORS } from "../../assets/COLORS";

export const ShoppingBagContext = createContext();
export const ShoppingBagContextProvider = ({ children }) => {
  const selectSizeTextColor = useSharedValue(0);

  const sizeTextAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      selectSizeTextColor.value,
      [0, 1],
      [COLORS.black, COLORS.red]
    );
    return { color: color };
  });
  const changeSizeTextColor = useCallback(() => {
    selectSizeTextColor.value = withTiming(1);
    selectSizeTextColor.value = withDelay(1000, withTiming(0));
  }, []);

  const [shoppingBag, setShoppingBag] = useState([]);
  const addItemToShoppingBag = useCallback(
    (
      name,
      normalPrice,
      discountPrice,
      images,
      primaryColor,
      secondaryColor,
      size
    ) => {
      setShoppingBag((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          normalPrice,
          discountPrice,
          name,
          images,
          primaryColor,
          secondaryColor,
          size,
          quantity: 1,
        },
      ]);
    },
    [shoppingBag]
  );
  const removeItemFromShoppingBag = useCallback(
    (id) => {
      setShoppingBag((prevState) =>
        shoppingBag.filter((item) => {
          return item.id !== id;
        })
      );
    },
    [shoppingBag]
  );

  const moreQuantity = useCallback(
    (index) => {
      const newShoppingBag = [...shoppingBag];
      newShoppingBag[index].quantity++;
      setShoppingBag(newShoppingBag);
    },
    [shoppingBag]
  );

  const lessQuantity = useCallback(
    (index) => {
      const newShoppingBag = [...shoppingBag];
      if (newShoppingBag[index].quantity === 1) {
        removeItemFromShoppingBag(newShoppingBag[index].id);
      } else {
        newShoppingBag[index].quantity--;
        setShoppingBag(newShoppingBag);
      }
    },
    [shoppingBag]
  );

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let total = 0;
    const itemTotal = shoppingBag.map((item) => {
      if (item.discountPrice === null) {
        total = total + item.quantity * item.normalPrice;
      } else {
        total = total + item.quantity * item.discountPrice;
      }
    });
    setTotalPrice((prevState) => total);
  }, [shoppingBag]);

  const [deleteToggle, setDeleteToggle] = useState(false);
  const changeDeleteToggle = useCallback(() => {
    setDeleteToggle(!deleteToggle);
  }, [deleteToggle]);
  return (
    <ShoppingBagContext.Provider
      value={{
        sizeTextAnimatedStyle,
        changeSizeTextColor: changeSizeTextColor,
        addItemToShoppingBag: addItemToShoppingBag,
        removeItemFromShoppingBag: removeItemFromShoppingBag,
        shoppingBag,
        moreQuantity: moreQuantity,
        lessQuantity: lessQuantity,
        totalPrice,
        deleteToggle,
        changeDeleteToggle: changeDeleteToggle,
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
};
