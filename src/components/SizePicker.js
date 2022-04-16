import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { COLORS } from "../../assets/COLORS";
import { NikeShoesDatabase } from "../../assets/ShoesData";
import SizePickerCell from "./SizePickerCell";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
const SizePicker = ({ currentIndex }) => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <View style={styles.listContainer}>
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        data={NikeShoesDatabase[currentIndex].sizes}
        renderItem={({ item, index }) => (
          <SizePickerCell
            currentIndex={currentIndex}
            item={item}
            index={index}
            translateX={translateX}
          />
        )}
        keyExtractor={(item) => item.size}
        onScroll={scrollHandler}
        bounce={false}
        decelerationRate={0}
      />
    </View>
  );
};

export default SizePicker;

const styles = StyleSheet.create({});
