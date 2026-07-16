import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
export default function ContactLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
