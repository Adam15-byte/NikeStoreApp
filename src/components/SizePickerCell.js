import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../assets/COLORS";

const SizePickerCell = ({ item, index }) => {
  const isFirst = index === 0;
  return (
    <TouchableOpacity onPress={() => console.log(index)}>
      <View style={[styles.cellContainer, { marginLeft: isFirst ? 0 : 10 }]}>
        <Text>{item.size}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SizePickerCell;

const styles = StyleSheet.create({
  cellContainer: {
    marginVertical: 5,
    height: 50,
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
});
