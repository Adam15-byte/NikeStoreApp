import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { COLORS } from "../../assets/COLORS";
import { NikeShoesDatabase } from "../../assets/ShoesData";
import SizePickerCell from "./SizePickerCell";
const SizePicker = ({ currentIndex }) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={NikeShoesDatabase[currentIndex].sizes}
        renderItem={({ item, index }) => (
          <SizePickerCell item={item} index={index} />
        )}
        keyExtractor={(item) => item.size}
      />
    </View>
  );
};

export default SizePicker;

const styles = StyleSheet.create({});
