import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
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
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import Svg, { SvgUri } from "react-native-svg";
import ThumnbailList from "../components/ThumnbailList";
import { ThumbnailChoiceContext } from "../service/ThumbnailChoiceContext";
import ShoeSwipeImage from "../components/ShoeSwipeImage";
import AnimatingDots from "../components/AnimatingDots";
import SizePicker from "../components/SizePicker";
import PriceContainer from "../components/PriceContainer";
import BlackButton from "../components/BlackButton";
import { ShoppingBagContext } from "../service/ShoppingBagContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BrowseScreen = () => {
  const { sizeTextAnimatedStyle, changeSizeTextColor } =
    useContext(ShoppingBagContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  // value to keep track of scrolling
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  const onScrollEnd = (event) => {
    let pageNumber = Math.min(
      Math.max(
        Math.floor(event.nativeEvent.contentOffset.x / SCREEN_WIDTH + 0.5) + 1,
        0
      ),
      NikeShoesDatabase.length
    );
    setCurrentIndex((prevState) => pageNumber - 1);
  };
  // value derived from translateX to determine the ActiveIndex
  const activeIndex = useDerivedValue(() => {
    return translateX.value / SCREEN_WIDTH;
  });

  const animatedSecondaryColor = useAnimatedStyle(() => {
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

  return (
    <View style={styles.mainContainer}>
      {/* Upper Half */}
      <Animated.View
        style={[styles.upperScrollContainer, animatedSecondaryColor]}
        colors={["transparent", "#fbc5ca"]}
      >
        <ShoppingBagIcon />
        <Animated.FlatList
          data={NikeShoesDatabase}
          // render of the shoe image used by FlatList done in component
          renderItem={({ item, index }) => (
            <ShoeSwipeImage item={item} index={index} translateX={translateX} />
          )}
          // snap the swipe to page width
          pagingEnabled={true}
          // scrollEventThrottle set to 16 to make the animation smoother
          scrollEventThrottle={16}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          // on Momentum scroll take a function to globally assign current Index
          onMomentumScrollEnd={onScrollEnd}
          style={styles.flatListStyle}
        />
        <Animated.View
          style={[styles.rectangleBackground, animatedPrimaryColor]}
        />
        <LinearGradient
          style={styles.linearGradient}
          colors={["white", "transparent"]}
        />
        {/* Animating dots container */}
        <View style={styles.dotsContainer}>
          <AnimatingDots activeIndex={activeIndex} translateX={translateX} />
        </View>
      </Animated.View>

      {/* Bottom Half */}
      <Animated.View
        style={[styles.bottomDescriptionContainer, animatedSecondaryColor]}
      >
        <TouchableOpacity onPress={changeSizeTextColor}>
          <Image
            source={require("../../assets/images/justdoit.png")}
            style={styles.justDoItImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.bottomRightContainer}>
          <View style={styles.additionalInfoContainer}>
            {NikeShoesDatabase[currentIndex].additional ? (
              <Text style={styles.additionalText}>
                {NikeShoesDatabase[currentIndex].additional}
              </Text>
            ) : null}
          </View>

          <Text style={styles.shoeName}>
            {NikeShoesDatabase[currentIndex].name}
          </Text>
          <Text style={styles.shoeTypeText}>
            {NikeShoesDatabase[currentIndex].type}
          </Text>
          <ThumnbailList
            activeIndex={activeIndex}
            currentIndex={currentIndex}
          />
          <Text numberOfLines={4} style={styles.description}>
            {NikeShoesDatabase[currentIndex].description}
          </Text>
          <View style={styles.sizePickerContainer}>
            <Animated.Text style={[styles.shoeTypeText, sizeTextAnimatedStyle]}>
              Select Size
            </Animated.Text>
            <SizePicker currentIndex={currentIndex} />
          </View>
          <View style={styles.priceButtonContainer}>
            <PriceContainer currentIndex={currentIndex} />
            <BlackButton
              text="Add to Bag"
              width={SCREEN_WIDTH - 150}
              padding={10}
              currentIndex={currentIndex}
            />
          </View>
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
    width: 50,
  },
  dotsContainer: {
    width: SCREEN_WIDTH / 2,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  rectangleBackground: {
    width: SCREEN_WIDTH / 1.5,
    aspectRatio: 1,
    borderRadius: SCREEN_WIDTH / 1.9,
    position: "absolute",
    zIndex: 10,
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
  bottomRightContainer: {
    width: "100%",
    height: "100%",
    padding: 20,
    width: SCREEN_WIDTH - 110,
    alignItems: "flex-start",
  },
  shoeName: {
    fontWeight: "800",
    fontSize: 18,
    letterSpacing: 1.1,
    textAlign: "center",
  },
  additionalInfoContainer: {
    height: 20,
  },
  additionalText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.orange,
  },
  shoeTypeText: {
    fontWeight: "500",
  },
  description: {
    textAlign: "justify",
    color: "#7a7a7a",
  },
  sizePickerContainer: {
    width: SCREEN_WIDTH - 110,
    height: 70,
    marginVertical: 10,
    justifyContent: "center",
  },
  priceButtonContainer: {
    width: SCREEN_WIDTH - 110,
    minHeight: 50,
  },
});
