import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useContext, useEffect } from "react";
import { COLORS } from "../../assets/COLORS";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { SizeChoiceContext } from "../service/SizeChoiceContext";
import { NikeShoesDatabase } from "../../assets/ShoesData";

const SizePickerCell = ({ item, index, translateX, currentIndex }) => {
  const { chosenSize, addSizeChoice } = useContext(SizeChoiceContext);
  const isFirst = index === 0;
  const isAvailable = item.available === true;
  const theChosenOne = item.size === chosenSize[currentIndex];
  const cellAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      // 60 is width of a single cell width addition of marginLeft
      [
        (index - 5) * 60,
        (index - 4) * 60,
        (index - 3) * 60,
        (index - 1) * 60,
        index * 60,
        (index + 1) * 60,
      ],
      [0, 1, 1, 1, 1, 0],
      Extrapolate.CLAMP
    );
    return { transform: [{ scale }] };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => addSizeChoice(currentIndex, item.size, index)}
    >
      <Animated.View
        style={[
          styles.cellContainer,
          cellAnimatedStyle,
          {
            marginLeft: isFirst ? 0 : 10,
            backgroundColor: isAvailable ? COLORS.white : COLORS.lightgrey,
            borderColor: theChosenOne ? COLORS.orange : COLORS.darkgrey,
          },
        ]}
      >
        <Text style={{ color: isAvailable ? COLORS.black : COLORS.darkgrey }}>
          {item.size}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default SizePickerCell;

const styles = StyleSheet.create({
  cellContainer: {
    marginVertical: 5,
    height: 50,
    aspectRatio: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
