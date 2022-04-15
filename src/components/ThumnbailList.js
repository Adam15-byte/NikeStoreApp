import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { NikeShoesDatabase } from "../../assets/ShoesData";
import { COLORS } from "../../assets/COLORS";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ThumbnailChoiceContext } from "../service/ThumbnailChoiceContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ThumnbailList = ({ activeIndex, currentIndex }) => {
  const { changeThumbnail, chosenThumbnail } = useContext(
    ThumbnailChoiceContext
  );

  // render of little thumbnail image, to click the image to View
  const renderImageThumbnail = ({ item, index }) => {
    const isSelected = () => {
      if (index === chosenThumbnail) {
        return true;
      } else {
        return false;
      }
    };
    return (
      <TouchableWithoutFeedback onPress={() => changeThumbnail(index)}>
        <Animated.View
          style={[
            styles.viewContainer,
            {
              padding: 3,
              borderWidth: 1,
              borderColor: isSelected() ? COLORS.orange : "transparent",
              borderRadius: 10,
              opacity: isSelected() ? 1 : 0.5,
            },
          ]}
        >
          <Animated.Image style={styles.thumbnailImage} source={item} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <>
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={NikeShoesDatabase[currentIndex].images}
        renderItem={renderImageThumbnail}
        scrollEnabled={false}
        keyExtractor={(_, index) => index}
      />
    </>
  );
};

export default ThumnbailList;

const styles = StyleSheet.create({
  thumbnailImage: {
    height: 60,
    width: 60,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  viewContainer: {
    marginHorizontal: 5,
    marginTop: 10,
    padding: 3,
  },
});
