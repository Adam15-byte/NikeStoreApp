import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../assets/COLORS";
import ShoppingBagIcon from "../components/ShoppingBagIcon";
import {
  NikeShoesDatabase,
  secondaryColors,
  primaryColors,
} from "../../assets/ShoesData";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BrowseScreen = () => {
  // value to keep track of scrolling
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  // value derived from translateX to determine the ActiveIndex
  const activeIndex = useDerivedValue(() => {
    return translateX.value / SCREEN_WIDTH;
  });

  const animatedBackgroundColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      activeIndex.value,
      [0, 1, 2, 3],
      secondaryColors
    );
    return { backgroundColor: backgroundColor };
  });
  const animatedPrimaryColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      activeIndex.value,
      [0, 1, 2, 3],
      primaryColors
    );
    return { backgroundColor: backgroundColor };
  });

  // render of the shoe image used by FlatList
  const renderShoe = ({ item }) => {
    return (
      <Animated.View style={styles.shoeContainer}>
        <Image
          style={styles.shoeImage}
          source={item.images[2]}
          resizeMode="contain"
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* Upper Half */}
      <Animated.View
        style={[styles.upperScrollContainer, animatedBackgroundColor]}
        colors={["transparent", "#fbc5ca"]}
      >
        <ShoppingBagIcon />
        <Animated.FlatList
          data={NikeShoesDatabase}
          renderItem={renderShoe}
          pagingEnabled={true}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          style={styles.flatListStyle}
        />
        <Animated.View
          style={[styles.rectangleBackground, animatedPrimaryColor]}
        />
        <LinearGradient
          style={styles.linearGradient}
          colors={["white", "transparent"]}
        />
      </Animated.View>

      {/* Bottom Half */}
      <Animated.View
        style={[styles.bottomDescriptionContainer, animatedBackgroundColor]}
      >
        <Image
          source={require("../../assets/images/justdoit.png")}
          style={styles.justDoItImage}
          resizeMode="contain"
        />
        <View>
          <Text>KLIK</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default BrowseScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  upperScrollContainer: {
    flex: 0.5,
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.lightgrey,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  bottomDescriptionContainer: {
    flex: 0.5,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  justDoItImage: {
    marginHorizontal: 30,
    marginTop: "auto",
    marginBottom: "auto",
    height: "60%",
  },
  shoeContainer: {
    width: SCREEN_WIDTH,
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  rectangleBackground: {
    width: SCREEN_WIDTH / 1.5,
    aspectRatio: 1,
    borderRadius: SCREEN_WIDTH / 1.9,
    position: "absolute",
    zIndex: 10,
  },
  shoeImage: {
    maxWidth: "90%",
    zIndex: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  flatListStyle: {
    zIndex: 15,
  },
  linearGradient: {
    height: "100%",
    width: SCREEN_WIDTH,
    position: "absolute",
    zIndex: 1,
  },
});
