import React, { createContext, useState, useCallback } from "react";

export const ThumbnailChoiceContext = createContext();

export const ThumbnailChoiceContextProvider = ({ children }) => {
  const [chosenThumbnail, setChosenThumbnail] = useState(0);
  const changeThumbnail = useCallback(
    (index) => {
      setChosenThumbnail((prevState) => index);
    },
    [chosenThumbnail]
  );
  return (
    <ThumbnailChoiceContext.Provider
      value={{ chosenThumbnail, changeThumbnail: changeThumbnail }}
    >
      {children}
    </ThumbnailChoiceContext.Provider>
  );
};
