import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";

export const SizeChoiceContext = createContext();
export const SizeChoiceContextProvider = ({ children }) => {
  const [chosenSize, setChosenSize] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
  });
  const addSizeChoice = (index, size) => {
    setChosenSize((prevState) => ({ ...prevState, [index]: size }));
  };
  useEffect(() => {
    console.log(chosenSize);
  }, [chosenSize]);
  return (
    <SizeChoiceContext.Provider
      value={{ chosenSize, addSizeChoice: addSizeChoice }}
    >
      {children}
    </SizeChoiceContext.Provider>
  );
};
