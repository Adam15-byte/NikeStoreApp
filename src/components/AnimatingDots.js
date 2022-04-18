import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  Extrapolate,
} from "react-native-reanimated";
import { NikeShoesDatabase } from "../../assets/ShoesData";
import { COLORS } from "../../assets/COLORS";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const AnimatingDots = ({ translateX }) => {
  return (
    <>
      {NikeShoesDatabase.map((_, index) => {
        const borderAnimatedOutline = useAnimatedStyle(() => {
          const backgroundColor = interpolateColor(
            translateX.value,
            [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH,
            ],
            [COLORS.white, COLORS.black, COLORS.white]
          );
          return {
            backgroundColor,
          };
        });
        return (
          <Animated.View
            key={index}
            style={[styles.dot, borderAnimatedOutline]}
          />
        );
      })}
    </>
  );
};

export default AnimatingDots;

const styles = StyleSheet.create({
  dot: {
    width: 14,
    height: 14,
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
    opacity: 0.8,
    borderWidth: 1,
  },
});
