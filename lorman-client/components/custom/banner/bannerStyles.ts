import { StyleSheet, Dimensions } from "react-native";
import { BANNER_CONFIG } from "@/constants/bannerConfig";

const { width } = Dimensions.get("window");

export const bannerStyles = StyleSheet.create({
  imageContainer: {
    width,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width,
    position: "absolute",
    top: 0,
    left: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BANNER_CONFIG.overlay.backgroundColor,
  },
  contentOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.95,
  },
  button: {
    backgroundColor: BANNER_CONFIG.button.backgroundColor,
    paddingHorizontal: 32,
    borderRadius: BANNER_CONFIG.button.borderRadius,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export const getBannerSizes = (size: "small" | "medium" | "large") => {
  const typography = BANNER_CONFIG.typography[size];
  return {
    titleSize: typography.title,
    subtitleSize: typography.subtitle,
    lineHeight: typography.lineHeight,
    buttonPadding: size === "small" ? 12 : size === "medium" ? 14 : 16,
    imageHeight: BANNER_CONFIG.sizes[size],
  };
};