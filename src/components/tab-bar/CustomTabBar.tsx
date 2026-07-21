import { Ionicons } from "@expo/vector-icons";
import { forwardRef, useEffect } from "react";
import {
  Pressable,
  PressableProps,
  Text,
  useColorScheme,
  View,
  ViewProps,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const PALETTE = {
  light: {
    primary: "hsl(147 75% 33%)",
    primaryForeground: "hsl(0 0% 100%)",
    muted: "hsl(146 26% 40%)",
    card: "hsl(0 0% 100%)",
    border: "hsl(141 47% 83%)",
    badge: "hsl(6 74% 54%)",
  },
  dark: {
    primary: "hsl(142 70% 54%)",
    primaryForeground: "hsl(150 35% 100%)",
    muted: "hsl(140 17% 68%)",
    card: "hsl(149 27% 12%)",
    border: "hsl(149 16% 24%)",
    badge: "hsl(7 85% 76%)",
  },
} as const;

const BAR_HEIGHT = 64;
const ICON_BOX = 28;
const CENTER_SIZE = 56;
const CENTER_LIFT = 22;

function useTabBarPalette() {
  const scheme = useColorScheme();
  return scheme === "dark" ? PALETTE.dark : PALETTE.light;
}

export const TabBarContainer = forwardRef<View, ViewProps>(
  ({ style, children, ...props }, ref) => {
    const palette = useTabBarPalette();
    const insets = useSafeAreaInsets();
    // Sit above the home indicator / gesture bar on notched devices, but
    // keep a sane minimum on devices that report no bottom inset.
    const bottom = Math.max(insets.bottom, 16);
    return (
      <View
        ref={ref}
        {...props}
        style={[
          {
            position: "absolute",
            left: 20,
            right: 20,
            bottom,
            height: BAR_HEIGHT,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            borderRadius: BAR_HEIGHT / 2,
            backgroundColor: palette.card,
            borderWidth: 1,
            borderColor: palette.border,
            // Let the raised center button and badge render past the pill edge.
            overflow: "visible",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
            elevation: 10,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  },
);
TabBarContainer.displayName = "TabBarContainer";

type TabBarButtonProps = PressableProps & {
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon?: keyof typeof Ionicons.glyphMap;
  label: string;
  isFocused?: boolean;
  badge?: string;
};

export const TabBarButton = forwardRef<View, TabBarButtonProps>(
  ({ icon, activeIcon, label, isFocused, badge, style, ...props }, ref) => {
    const palette = useTabBarPalette();
    const progress = useSharedValue(isFocused ? 1 : 0);

    useEffect(() => {
      progress.value = withSpring(isFocused ? 1 : 0, {
        damping: 16,
        stiffness: 180,
      });
    }, [isFocused, progress]);

    const iconStyle = useAnimatedStyle(() => ({
      transform: [{ scale: 1 + progress.value * 0.12 }],
    }));

    const labelStyle = useAnimatedStyle(() => ({
      opacity: 0.6 + progress.value * 0.4,
    }));

    return (
      <Pressable
        ref={ref as any}
        {...props}
        style={(state) => [
          typeof style === "function" ? style(state) : style,
          {
            flex: 1,
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            paddingHorizontal: 10,
            justifyContent: "center",
            gap: 4,
          },
        ]}
      >
        <Animated.View
          style={[
            iconStyle,
            {
              width: ICON_BOX,
              height: ICON_BOX,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Ionicons
            name={isFocused && activeIcon ? activeIcon : icon}
            size={24}
            color={isFocused ? palette.primary : palette.muted}
          />
          {badge ? (
            <View
              style={{
                position: "absolute",
                top: -2,
                right: -6,
                minWidth: 16,
                height: 16,
                borderRadius: 8,
                paddingHorizontal: 2,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: palette.badge,
                borderWidth: 1.5,
                borderColor: palette.card,
              }}
            >
              <Text style={{ color: "white", fontSize: 9, fontWeight: "700" }}>
                {badge}
              </Text>
            </View>
          ) : null}
        </Animated.View>
        <Animated.Text
          numberOfLines={1}
          style={[
            labelStyle,
            {
              fontSize: 11,
              fontWeight: isFocused ? "700" : "500",
              color: isFocused ? palette.primary : palette.muted,
              textAlign: "center",
            },
          ]}
        >
          {label}
        </Animated.Text>
      </Pressable>
    );
  },
);
TabBarButton.displayName = "TabBarButton";

type TabBarCenterButtonProps = PressableProps & {
  icon: keyof typeof Ionicons.glyphMap;
  isFocused?: boolean;
};

export const TabBarCenterButton = forwardRef<View, TabBarCenterButtonProps>(
  ({ icon, isFocused, style, ...props }, ref) => {
    const palette = useTabBarPalette();
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: -CENTER_LIFT }, { scale: scale.value }],
    }));

    return (
      <Pressable
        ref={ref as any}
        {...props}
        onPressIn={(e) => {
          scale.value = withSpring(0.9);
          props.onPressIn?.(e);
        }}
        onPressOut={(e) => {
          scale.value = withSpring(1);
          props.onPressOut?.(e);
        }}
        style={(state) => [
          typeof style === "function" ? style(state) : style,
          {
            flex: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Animated.View
          style={[
            animatedStyle,
            {
              width: CENTER_SIZE,
              height: CENTER_SIZE,
              borderRadius: CENTER_SIZE / 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: palette.primary,
              borderWidth: 4,
              borderColor: palette.card,
              shadowColor: palette.primary,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 10,
              elevation: 8,
            },
          ]}
        >
          <Ionicons name={icon} size={26} color={palette.primaryForeground} />
        </Animated.View>
      </Pressable>
    );
  },
);
TabBarCenterButton.displayName = "TabBarCenterButton";
