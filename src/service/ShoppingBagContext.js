import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";
import { NikeShoesDatabase } from "../../assets/ShoesData";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { COLORS } from "../../assets/COLORS";

export const ShoppingBagContext = createContext();
export const ShoppingBagContextProvider = ({ children }) => {
  const selectSizeTextColor = useSharedValue(COLORS.black);
  const sizeTextAnimatedStyle = useAnimatedStyle(() => {
    return { color: selectSizeTextColor.value };
  });
  const changeSizeTextColor = () => {
    selectSizeTextColor.value = COLORS.red;
    selectSizeTextColor.value = withDelay(
      1000,
      withTiming(COLORS.black, { duration: 10 })
    );
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
  useEffect(() => {
    console.log(shoppingBag);
  }, [shoppingBag]);

  return (
    <ShoppingBagContext.Provider
      value={{
        sizeTextAnimatedStyle,
        changeSizeTextColor: changeSizeTextColor,
        addItemToShoppingBag: addItemToShoppingBag,
        shoppingBag,
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
};
