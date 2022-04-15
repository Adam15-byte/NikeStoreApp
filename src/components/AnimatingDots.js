import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import { NikeShoesDatabase } from "../../assets/ShoesData";
import { COLORS } from "../../assets/COLORS";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const AnimatingDots = ({ translateX, activeIndex }) => {
  return (
    <>
      {NikeShoesDatabase.map((item, index) => {
        const borderAnimatedOutline = useAnimatedStyle(() => {
          return {};
        });
        return (
          <Animated.View
            style={[styles.dot, { backgroundColor: item.primaryColor }]}
          />
        );
      })}
    </>
  );
};

export default AnimatingDots;

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
    opacity: 0.7,
  },
});
