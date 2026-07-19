import { useClerk } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function index() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary dark:bg-secondary flex-1 justify-center items-center ">
      <Pressable
        className="self-center bg-primary-foreground/80 dark:bg-foreground/80 px-4 py-2 rounded-[30px]"
        onPress={handleSignOut}
      >
        <Text>Sign Out </Text>
      </Pressable>
    </SafeAreaView>
  );
}
 