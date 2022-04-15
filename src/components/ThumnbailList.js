import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext } from "react";
import { NikeShoesDatabase } from "../../assets/ShoesData";
import { COLORS } from "../../assets/COLORS";
import Animated from "react-native-reanimated";
import { ThumbnailChoiceContext } from "../service/ThumbnailChoiceContext";

const ThumnbailList = () => {
  const { changeThumbnail } = useContext(ThumbnailChoiceContext);
  // render of little thumbnail image, to click the image to View
  const renderImageThumbnail = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => changeThumbnail(index)}>
        <Animated.View>
          <Image style={styles.thumbnailImage} source={item} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={NikeShoesDatabase[0].images}
        renderItem={renderImageThumbnail}
        scrollEnabled={false}
        keyExtractor={(_, index) => index}
      />
    </>
  );
};

export default ThumnbailList;

const styles = StyleSheet.create({
  thumbnailImage: {
    height: 70,
    width: 70,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: COLORS.white,
    opacity: 1,
  },
});
