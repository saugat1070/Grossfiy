import useSocialAuth from "@/hooks/useSocialAuth";
import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  const isGoogleClicked = loadingStrategy === "oauth_google";
  const isAppleClicked = loadingStrategy === "oauth_apple";

  const isLoading = isAppleClicked || isGoogleClicked;
  return (
    <SafeAreaView
      className="bg-primary dark:bg-secondary flex-1"
      edges={["top"]}
    >
      {/* decorator */}
      <View className="absolute -left-16 top-16 h-56 w-56 rounded-full bg-primary/80 dark:bg-background/40" />
      <View className="absolute right-[-74px] top-40 h-56 w-56 rounded-full bg-primary/70 dark:bg-background/35" />

      <View className="px-6 pt-4">
        <Text className="text-center text-5xl font-extrabold tracking-tight text-primary-foreground uppercase font-mono dark:text-foreground">
          Grocify
        </Text>
        <Text className="mt-1 text-center text-[14px] text-primary-foreground/80 dark:text-foreground/75">
          Plan Smarter, Shop Smarter
        </Text>

        <View className="mt-6 items-center rounded-[30px] border border-white/20 bg-white/10 p-3">
          <Image
            source={require("@/assets/auth.png")}
            style={{ width: 300, height: 300 }}
            className="rounded-2xl"
            resizeMode="contain"
          />
        </View>
      </View>
      <View className="mt-8 flex-1 rounded-t-[36px] bg-card px-6 py-8 pt-6 pb-6">
        <View className="self-center rounded-full bg-secondary px-3 py-1">
          <Text className="text-xs font-semibold uppser tracking-[1px] text-primary dark:text-foreground">
            WELCOME BACK
          </Text>
        </View>
        <View className="mt-4">
          <Text className="text-xs text-center text-primary-foreground dark:text-foreground">
            Choose a social provider and jump right into your personalized
            grocery experience.
          </Text>
        </View>

        <View className="mt-8">
          <Pressable
            className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-80 ${
              isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_google")}
          >
            <View className="bg-white p-1 rounded-full">
              <Image
                source={require("@/assets/google.png")}
                className=""
                style={{ width: 20, height: 20 }}
              />
            </View>

            <Text className="ml-2 text-sm font-medium text-primary  dark:text-foreground">
              {isGoogleClicked ? "Connecting Google..." : "Contiue with Google"}
            </Text>

            <FontAwesome
              name="angle-right"
              size={24}
              color="#5f6e66"
              className="ml-auto"
            />
          </Pressable>

          <Pressable
            className={`bg-foreground mb-3 h-14 flex-row items-center rounded-2xl border border-border px-4 active:opacity-80 ${
              isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_apple")}
          >
            <View className="bg-white p-1 rounded-full">
              <Image
                source={require("@/assets/apple.png")}
                className=""
                style={{ width: 20, height: 20 }}
              />
            </View>

            <Text className="ml-2 text-sm font-medium text-primary  dark:text-black/90">
              {isAppleClicked ? "Connecting Apple..." : "Contiue with Apple"}
            </Text>

            <FontAwesome
              name="angle-right"
              size={24}
              color="#5f6e66"
              className="ml-auto"
            />
          </Pressable>
        </View>
        <View>
          <Text className="text-center text-xs text-primary-foreground/80 dark:text-foreground">
            By contining, you aggree to our Terms and privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
