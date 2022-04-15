import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import React, { useContext } from "react";
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
import Svg, { SvgUri } from "react-native-svg";
import ThumnbailList from "../components/ThumnbailList";
import { ThumbnailChoiceContext } from "../service/ThumbnailChoiceContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BrowseScreen = () => {
  const { chosenThumbnail } = useContext(ThumbnailChoiceContext);
  // value to keep track of scrolling
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

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

  // render of the shoe image used by FlatList
  const renderShoe = ({ item }) => {
    return (
      <Animated.View style={styles.shoeContainer}>
        <Image
          style={styles.shoeImage}
          source={item.images[chosenThumbnail]}
          resizeMode="contain"
        />
      </Animated.View>
    );
  };

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
        style={[styles.bottomDescriptionContainer, animatedSecondaryColor]}
      >
        <Image
          source={require("../../assets/images/justdoit.png")}
          style={styles.justDoItImage}
          resizeMode="contain"
        />
        <View style={styles.bottomRightContainer}>
          <Text style={styles.shoeName}>{NikeShoesDatabase[3].name}</Text>
          <ThumnbailList />
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
  bottomRightContainer: {
    width: "100%",
    height: "100%",
    padding: 20,
    width: SCREEN_WIDTH - 110,
    alignItems: "center",
  },
  shoeName: {
    fontWeight: "800",
    fontSize: 18,
    letterSpacing: 1.1,
    textAlign: "center",
  },
});
