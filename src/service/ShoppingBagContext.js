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
