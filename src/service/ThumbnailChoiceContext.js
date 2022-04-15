import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";

export const ThumbnailChoiceContext = createContext();

export const ThumbnailChoiceContextProvider = ({ children }) => {
  const [chosenThumbnail, setChosenThumbnail] = useState(0);
  const changeThumbnail = (index) => {
    setChosenThumbnail((prevState) => index);
  };
  return (
    <ThumbnailChoiceContext.Provider
      value={{ chosenThumbnail, changeThumbnail: changeThumbnail }}
    >
      {children}
    </ThumbnailChoiceContext.Provider>
  );
};
