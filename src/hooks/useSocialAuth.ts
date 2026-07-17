import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

type LoadingStrategy = "oauth_google" | "oauth_apple" | "oauth_github";
const useSocialAuth = () => {
  const { startSSOFlow } = useSSO();
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);

  const handleSocialAuth = async (strategy: LoadingStrategy) => {
    if (loadingStrategy) return;

    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (!createdSessionId || !setActive) {
        Alert.alert("Something went wrong");
        return;
      }
      await setActive({ session: createdSessionId });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to sign in. Please try again.");
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
};

export default useSocialAuth;
