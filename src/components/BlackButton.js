import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useContext } from "react";
import { COLORS } from "../../assets/COLORS";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { ShoppingBagContext } from "../service/ShoppingBagContext";

const BlackButton = ({ text, width, padding }) => {
  const { changeSizeTextColor } = ShoppingBagContext;
  const bgColor = useSharedValue(COLORS.black);
  const displayText = useSharedValue(text);
  const animatedStyle = useAnimatedStyle(() => {
    return { backgroundColor: bgColor.value };
  });
  const animate = () => {
    bgColor.value = withTiming(COLORS.orange);
    bgColor.value = withDelay(1000, withTiming(COLORS.black));
  };
  return (
    <TouchableWithoutFeedback onPress={animate}>
      <Animated.View
        style={[
          styles.buttonContainer,
          animatedStyle,
          { width: width, padding: padding },
        ]}
      >
        <Animated.Text style={styles.textInside}>
          {displayText.value}
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default BlackButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginVertical: 5,
  },
  textInside: {
    color: COLORS.white,
    fontWeight: "500",
  },
});
