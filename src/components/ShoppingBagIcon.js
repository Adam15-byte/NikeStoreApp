import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../assets/COLORS";
import { ShoppingBagContext } from "../service/ShoppingBagContext";
import Animated, { BounceIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const ShoppingBagIcon = () => {
  const { shoppingBag } = useContext(ShoppingBagContext);
  const navigation = useNavigation();
  return (
    <View style={styles.shoppingBagIconContainer}>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => navigation.navigate("ShoppingCart")}
      >
        <MaterialCommunityIcons
          name="shopping-outline"
          size={30}
          color={COLORS.black}
        />
        {shoppingBag.length !== 0 && (
          <Animated.View
            entering={BounceIn}
            style={styles.numberOfItemsContainer}
          >
            <Text style={styles.itemsText}>{shoppingBag.length}</Text>
          </Animated.View>
        )}
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
    zIndex: 999,
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
