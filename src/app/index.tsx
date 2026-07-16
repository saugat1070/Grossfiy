import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex items-center justify-center w-full h-full">
      <Text className="text-xl text-red-400">
        Edit src/app/index.tsx to edit this screen.
      </Text>
      <Link href="/about">
        <Text>Navigate to about</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
