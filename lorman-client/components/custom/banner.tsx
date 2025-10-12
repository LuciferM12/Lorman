import { Dimensions, StyleSheet, View, Text } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  interpolate,
} from "react-native-reanimated";
import { Button } from "@/components/ui/button";
import { Text as UIText } from "@/components/ui/text";

const { width } = Dimensions.get("window");

type BannerSize = "small" | "medium" | "large";

type BannerProps = {
  size?: BannerSize;
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonPress?: () => void;
  imageSource: any; // require('@/assets/images/...')
};

const BANNER_SIZES = {
  small: 400,
  medium: 550,
  large: 700,
};

const Banner = ({
  size = "large",
  title,
  subtitle,
  buttonText,
  onButtonPress,
  imageSource,
}: BannerProps) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const IMG_HEIGHT = BANNER_SIZES[size];

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 2], [1, 0]),
    };
  });

  // Ajustar tamaños de texto según el tamaño del banner
  const titleSize = size === "small" ? 32 : size === "medium" ? 40 : 48;
  const subtitleSize = size === "small" ? 14 : size === "medium" ? 16 : 18;
  const buttonPadding = size === "small" ? 12 : size === "medium" ? 14 : 16;

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        {/* Imagen de fondo con parallax */}
        <View style={[styles.imageContainer, { height: IMG_HEIGHT }]}>
          <Animated.Image
            source={imageSource}
            style={[
              styles.image,
              { height: IMG_HEIGHT },
              imageAnimatedStyle,
            ]}
          />

          {/* Overlay oscuro */}
          <View style={styles.overlay} />

          {/* Contenido sobre la imagen */}
          <Animated.View style={[styles.contentOverlay, overlayAnimatedStyle]}>
            <Text style={[styles.title, { fontSize: titleSize }]}>
              {title}
            </Text>
            <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>
              {subtitle}
            </Text>
            <Button
              style={[styles.button, { paddingVertical: buttonPadding }]}
              onPress={onButtonPress}
            >
              <UIText style={styles.buttonText}>{buttonText}</UIText>
            </Button>
          </Animated.View>
        </View>

        {/* Contenido adicional */}
        <View style={styles.content}>
          <Text className="font-bold text-3xl text-center mt-20">
            Welcome to Lorman App!
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    backgroundColor: "rgba(0, 40, 80, 0.6)",
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
    lineHeight: 56,
  },
  subtitle: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 26,
    opacity: 0.95,
  },
  button: {
    backgroundColor: "#3b9fc9",
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    minHeight: 1000,
    backgroundColor: "#fff",
  },
});

export default Banner;