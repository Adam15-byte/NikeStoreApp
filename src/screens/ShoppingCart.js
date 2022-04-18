import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext } from "react";
import { COLORS } from "../../assets/COLORS";
import { ShoppingBagContext } from "../service/ShoppingBagContext";
import ShoppingBagItem from "../components/ShoppingBagItem";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CheckoutBlackButton from "../components/CheckoutBlackButton";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ShoppingCart = () => {
  const {
    shoppingBag,
    removeItemFromShoppingBag,
    moreQuantity,
    lessQuantity,
    totalPrice,
  } = useContext(ShoppingBagContext);

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>My Bag</Text>
        <TouchableWithoutFeedback>
          <Ionicons name="trash-outline" size={24} color={COLORS.supergrey} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.middleContainer}>
        <FlatList
          data={shoppingBag}
          renderItem={({ item, index }) => (
            <ShoppingBagItem
              item={item}
              index={index}
              moreQuantity={moreQuantity}
              lessQuantity={lessQuantity}
            />
          )}
          style={{ paddingTop: 15 }}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.totalPriceText}>$ {totalPrice.toFixed(2)}</Text>
          <CheckoutBlackButton />
        </View>
      </View>
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.white,
  },
  topContainer: {
    height: 70,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginTop: 40,
  },
  headerText: {
    fontWeight: "800",
    fontSize: 18,
  },
  middleContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.lightgrey,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  bottomContainer: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: COLORS.white,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 40,
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: "800",
  },
});
