import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../assets/COLORS";
import { NikeShoesDatabase } from "../../assets/ShoesData";

const PriceContainer = ({ currentIndex }) => {
  // discountPrice, normalPrice
  const discountRate =
    100 -
    Math.floor(
      (NikeShoesDatabase[currentIndex].discountPrice * 100) /
        NikeShoesDatabase[currentIndex].normalPrice
    );
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.normalPriceText}>
        $ {NikeShoesDatabase[currentIndex].normalPrice}
      </Text>
      {NikeShoesDatabase[currentIndex].discountPrice && (
        <Text style={styles.discountPriceText}>
          $ {NikeShoesDatabase[currentIndex].discountPrice}
        </Text>
      )}
      {NikeShoesDatabase[currentIndex].discountPrice && (
        <Text style={styles.offPercent}>{discountRate}% off</Text>
      )}
    </View>
  );
};

export default PriceContainer;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    width: "55%",
    alignItems: "flex-end",
  },
  normalPriceText: {
    marginRight: "auto",
    fontWeight: "800",
    fontSize: 18,
    letterSpacing: 1.1,
  },
  discountPriceText: {
    marginRight: "auto",
    fontWeight: "500",
    color: "#7a7a7a",
    textDecorationLine: "line-through",
  },
  offPercent: {
    fontWeight: "500",
    color: COLORS.green,
  },
});
