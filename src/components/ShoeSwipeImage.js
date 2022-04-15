import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useContext } from "react";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { ThumbnailChoiceContext } from "../service/ThumbnailChoiceContext";
import { COLORS } from "../../assets/COLORS";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ShoeSwipeImage = ({ item, index, translateX }) => {
  const { chosenThumbnail } = useContext(ThumbnailChoiceContext);
  const animatedSwipeStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [40, 0, 40],
      Extrapolate.CLAMP
    );
    const rotate = interpolate(
      translateX.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [-50, 0, 50],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      translateX.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.7, 1, 0.7],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }, { rotate: `${rotate}deg` }, { scale }],
    };
  });
  return (
    <Animated.View style={styles.shoeContainer}>
      <Animated.Image
        style={[styles.shoeImage, animatedSwipeStyle]}
        source={item.images[chosenThumbnail]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export default ShoeSwipeImage;

const styles = StyleSheet.create({
  shoeImage: {
    maxWidth: "90%",
    zIndex: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  shoeContainer: {
    width: SCREEN_WIDTH,
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    zIndex: 999,
  },
});
