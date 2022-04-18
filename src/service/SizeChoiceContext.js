import React, { createContext, useState, useCallback } from "react";
import { NikeShoesDatabase } from "../../assets/ShoesData";

export const SizeChoiceContext = createContext();
export const SizeChoiceContextProvider = ({ children }) => {
  const [chosenSize, setChosenSize] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
  });
  const addSizeChoice = useCallback(
    (index, size, sizeObjectIndex) => {
      if (NikeShoesDatabase[index].sizes[sizeObjectIndex].available === false) {
        null;
      } else {
        if (chosenSize[index] === size) {
          setChosenSize((prevState) => ({ ...prevState, [index]: null }));
        } else {
          setChosenSize((prevState) => ({ ...prevState, [index]: size }));
        }
      }
    },
    [chosenSize]
  );

  return (
    <SizeChoiceContext.Provider
      value={{ chosenSize, addSizeChoice: addSizeChoice }}
    >
      {children}
    </SizeChoiceContext.Provider>
  );
};
