import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { COLORS } from "../../assets/COLORS";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const CheckoutBlackButton = () => {
  const bgColor = useSharedValue(COLORS.black);
  const animatedStyle = useAnimatedStyle(() => {
    return { backgroundColor: bgColor.value };
  });
  const animateStyle = () => {
    bgColor.value = withTiming(COLORS.orange);
    bgColor.value = withDelay(1000, withTiming(COLORS.black));
  };
  return (
    <TouchableWithoutFeedback onPress={animateStyle}>
      <Animated.View
        style={[
          styles.buttonContainer,
          animatedStyle,
          { width: 140, padding: 10 },
        ]}
      >
        <Text style={styles.textInside}>Check Out</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CheckoutBlackButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  textInside: {
    color: COLORS.white,
    fontWeight: "500",
  },
});
