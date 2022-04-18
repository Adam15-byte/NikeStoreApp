import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import { COLORS } from "../../assets/COLORS";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ICON_WIDTH = 90;
const ICON_HEIGHT = 90;

const ShoppingBagItem = ({ item, index, moreQuantity, lessQuantity }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <View
          style={[styles.outerCircle, { backgroundColor: item.secondaryColor }]}
        >
          <View
            style={[
              styles.innerCircle,
              { backgroundColor: item.secondaryColor },
            ]}
          >
            <Image source={item.images[2]} style={styles.image} />
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.mainPrice}>{item.name}</Text>
        <Text style={styles.quantityText}>Size: {item.size}</Text>
        {item.discountPrice !== null && (
          <View style={styles.discountBarContainer}>
            <Text style={styles.mainPrice}>$ {item.discountPrice}</Text>
            <Text style={styles.discountPriceText}>$ {item.normalPrice}</Text>
          </View>
        )}
        {item.discountPrice === null && (
          <Text style={styles.mainPrice}>$ {item.normalPrice}</Text>
        )}
      </View>
      <View style={styles.quantityPickerContainer}>
        <TouchableWithoutFeedback
          style={styles.minusButton}
          onPress={() => lessQuantity(index)}
        >
          <Text> - </Text>
        </TouchableWithoutFeedback>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableWithoutFeedback
          onPress={() => moreQuantity(index)}
          style={styles.plusButton}
        >
          <Text> + </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default ShoppingBagItem;

const styles = StyleSheet.create({
  mainContainer: {
    height: 110,
    width: SCREEN_WIDTH * 0.85,
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginTop: 15,
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  iconContainer: {
    width: ICON_WIDTH,
    height: ICON_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  quantityPickerContainer: {
    marginRight: 20,
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
    paddingVertical: 10,
  },
  statsContainer: {
    height: ICON_HEIGHT,
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingVertical: 10,
    marginLeft: 25,
  },
  image: {
    width: ICON_WIDTH * 1.2,
    height: ICON_HEIGHT * 1.2,
    shadowColor: COLORS.black,
    shadowRadius: 3,
    shadowOpacity: 0.1,
    shadowOffset: { height: 10, width: 0 },
  },
  outerCircle: {
    width: ICON_WIDTH * 0.96,
    height: ICON_HEIGHT * 0.96,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ICON_WIDTH / 2,
  },
  innerCircle: {
    width: ICON_WIDTH * 0.9,
    height: ICON_HEIGHT * 0.9,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ICON_WIDTH / 2,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  discountBarContainer: {
    flexDirection: "row",
  },
  discountPriceText: {
    textDecorationLine: "line-through",
    color: COLORS.supergrey,
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 10,
  },
  mainPrice: {
    color: COLORS.black,
    fontWeight: "500",
    fontSize: 14,
  },
  minusButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.lightgrey,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.black,
    shadowRadius: 5,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 3 },
  },
  plusButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.darkgrey,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.black,
    shadowRadius: 5,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 3 },
  },
  quantityText: {
    fontWeight: "600",
    fontSize: 12,
    color: COLORS.black,
  },
});
