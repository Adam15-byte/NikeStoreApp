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
import { SizeChoiceContext } from "../service/SizeChoiceContext";
import { NikeShoesDatabase } from "../../assets/ShoesData";

const BlackButton = ({ text, width, padding, currentIndex }) => {
  const { changeSizeTextColor, addItemToShoppingBag } =
    useContext(ShoppingBagContext);
  const { chosenSize } = useContext(SizeChoiceContext);
  const bgColor = useSharedValue(COLORS.black);
  const displayText = useSharedValue(text);
  const animatedStyle = useAnimatedStyle(() => {
    return { backgroundColor: bgColor.value };
  });
  const animateAndAddToBag = () => {
    if (chosenSize[currentIndex] === null) {
      changeSizeTextColor();
    } else {
      addItemToShoppingBag(
        NikeShoesDatabase[currentIndex].name,
        NikeShoesDatabase[currentIndex].normalPrice,
        NikeShoesDatabase[currentIndex].discountPrice,
        NikeShoesDatabase[currentIndex].images,
        NikeShoesDatabase[currentIndex].primaryColor,
        NikeShoesDatabase[currentIndex].secondaryColor,
        chosenSize[currentIndex]
      );
      bgColor.value = withTiming(COLORS.orange);
      bgColor.value = withDelay(1000, withTiming(COLORS.black));
    }
  };
  return (
    <TouchableWithoutFeedback onPress={animateAndAddToBag}>
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
