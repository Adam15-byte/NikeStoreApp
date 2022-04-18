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
    moreQuantity,
    lessQuantity,
    totalPrice,
    deleteToggle,
    changeDeleteToggle,
  } = useContext(ShoppingBagContext);

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>My Bag</Text>
        <TouchableWithoutFeedback onPress={() => changeDeleteToggle()}>
          <Ionicons
            name="trash-outline"
            size={24}
            color={deleteToggle ? COLORS.red : COLORS.supergrey}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.middleContainer}>
        {shoppingBag.length === 0 && (
          <View>
            <Text style={styles.noItemsText}>
              No items in your shopping bag
            </Text>
          </View>
        )}
        {shoppingBag.length !== 0 && (
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
            style={{
              paddingTop: 15,
              height: SCREEN_HEIGHT - 130,
              marginBottom: 130,
              paddingBottom: 300,
            }}
          />
        )}
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.totalTitle}>Total:</Text>
            <Text style={styles.totalPriceText}>$ {totalPrice.toFixed(2)}</Text>
          </View>
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
    fontSize: 20,
    letterSpacing: 1.5,
  },
  middleContainer: {
    width: "100%",
    height: SCREEN_HEIGHT - 130,
    backgroundColor: COLORS.lightgrey,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    height: 130,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: COLORS.white,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 40,
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: "800",
  },
  totalTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  noItemsText: {
    color: COLORS.supergrey,
    letterSpacing: 1.3,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 30,
  },
});
