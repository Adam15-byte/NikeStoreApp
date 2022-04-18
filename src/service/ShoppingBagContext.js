import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";
import { NikeShoesDatabase } from "../../assets/ShoesData";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  withSpring,
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
  const changeSizeTextColor = () => {
    selectSizeTextColor.value = withTiming(1);
    selectSizeTextColor.value = withDelay(1000, withTiming(0));
  };

  const [shoppingBag, setShoppingBag] = useState([]);
  const addItemToShoppingBag = (
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
  };
  const removeItemFromShoppingBag = (id) => {
    setShoppingBag((prevState) =>
      shoppingBag.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const moreQuantity = (index) => {
    const newShoppingBag = [...shoppingBag];
    newShoppingBag[index].quantity++;
    setShoppingBag(newShoppingBag);
  };

  const lessQuantity = (index) => {
    const newShoppingBag = [...shoppingBag];
    if (newShoppingBag[index].quantity === 1) {
      removeItemFromShoppingBag(newShoppingBag[index].id);
    } else {
      newShoppingBag[index].quantity--;
      setShoppingBag(newShoppingBag);
    }
  };

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
const changeDeleteToggle = () => {
  setDeleteToggle(!deleteToggle);
};
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
};;;
