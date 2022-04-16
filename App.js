import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Navigation";
import { ThumbnailChoiceContextProvider } from "./src/service/ThumbnailChoiceContext";
import { SizeChoiceContextProvider } from "./src/service/SizeChoiceContext";
import { ShoppingBagContextProvider } from "./src/service/ShoppingBagContext";
export default function App() {
  return (
    <ShoppingBagContextProvider>
      <SizeChoiceContextProvider>
        <ThumbnailChoiceContextProvider>
          <Navigation />
        </ThumbnailChoiceContextProvider>
      </SizeChoiceContextProvider>
    </ShoppingBagContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
