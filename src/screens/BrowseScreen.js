import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { COLORS } from "../../assets/COLORS";
import ShoppingBagIcon from "../components/ShoppingBagIcon";
import { NikeShoesDatabase } from "../../assets/ShoesData";
import Animated, {
  useAnimatedScrollHandler,
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
    return Math.round(translateX.value / SCREEN_WIDTH);
  });

  // render of the shoe image used by FlatList
  const renderShoe = ({ item }) => {
    return (
      <Animated.View style={styles.shoeContainer}>
        <Image
          style={styles.shoeImage}
          source={item.images[0]}
          resizeMode="contain"
        />
      </Animated.View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      {/* Upper Half */}
      <View style={styles.upperScrollContainer}>
        <ShoppingBagIcon />
        <Animated.FlatList
          data={NikeShoesDatabase}
          renderItem={renderShoe}
          pagingEnabled={true}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
        />
      </View>

      {/* Bottom Half */}
      <View style={styles.bottomDescriptionContainer}>
        <Image
          source={require("../../assets/images/justdoit.png")}
          style={styles.justDoItImage}
          resizeMode="contain"
        />
        <View>
          <Animated.Text>{translateX.value}</Animated.Text>
        </View>
      </View>
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
  },
  bottomDescriptionContainer: {
    flex: 0.5,
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.darkgrey,
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
  shoeImage: {
    maxWidth: "80%",
  },
});
