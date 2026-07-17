import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function HomeRootLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
