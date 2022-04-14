import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../assets/COLORS";

const ShoppingBagIcon = () => {
  return (
    <View style={styles.shoppingBagIconContainer}>
      <TouchableOpacity activeOpacity={0.4}>
        <MaterialCommunityIcons
          name="shopping-outline"
          size={30}
          color={COLORS.black}
        />
        <View style={styles.numberOfItemsContainer}>
          <Text style={styles.itemsText}>2</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingBagIcon;

const styles = StyleSheet.create({
  shoppingBagIconContainer: {
    position: "absolute",
    right: 30,
    top: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  numberOfItemsContainer: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.orange,
    position: "absolute",
    right: -3,
    bottom: -3,
    alignItems: "center",
    justifyContent: "center",
  },
  itemsText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "800",
    textAlign: "center",
  },
});
