import {
  TabBarButton,
  TabBarCenterButton,
  TabBarContainer,
} from "@/components/tab-bar/CustomTabBar";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";

export default function HomeRootLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <TabBarContainer>
          <TabTrigger name="index" href="/" asChild>
            <TabBarButton icon="list-outline" activeIcon="list" label="List" />
          </TabTrigger>
          <TabTrigger name="planner" href="/planner" asChild>
            <TabBarCenterButton icon="add" />
          </TabTrigger>
          <TabTrigger name="insights" href="/insights" asChild>
            <TabBarButton
              icon="bar-chart-outline"
              activeIcon="bar-chart"
              label="Insights"
              badge="9"
            />
          </TabTrigger>
        </TabBarContainer>
      </TabList>
    </Tabs>
  );
}
