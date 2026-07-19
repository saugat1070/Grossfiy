import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";

export default function HomeRootLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const colorSchema = useColorScheme();
  const tintColor =
    colorSchema === "dark" ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)";
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }
  return (
    <NativeTabs tintColor={tintColor} blurEffect="systemUltraThinMaterial" >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>List</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="list.bullet.badge.ellipsis" md="lists" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="planner">
        <NativeTabs.Trigger.Icon sf="plus.circle" md="add" />
        <NativeTabs.Trigger.Label>Planner</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>{" "}
      <NativeTabs.Trigger name="insights">
        <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="chart.bar"
          md={{
            default: "search_insights",
            selected: "insights",
          }}
        />
        <NativeTabs.Trigger.Badge>+9</NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

// sf --> it is used for ios tab icon
// md --> it is used for android tab icon
