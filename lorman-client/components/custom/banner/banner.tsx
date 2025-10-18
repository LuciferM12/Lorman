import { View, Text, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, SharedValue } from 'react-native-reanimated';
import { Button } from '@/components/ui/button';
import { Text as UIText } from '@/components/ui/text';
import { bannerStyles, getBannerSizes } from './bannerStyles';

type BannerSize = 'small' | 'medium' | 'large';

type BannerProps = {
  size?: BannerSize;
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonPress?: () => void;
  imageSource: any;
  scrollOffset: SharedValue<number>;
};

const Banner = ({
  size = 'large',
  title,
  subtitle,
  buttonText,
  onButtonPress,
  imageSource,
  scrollOffset,
}: BannerProps) => {
  const { titleSize, subtitleSize, buttonPadding, imageHeight } = getBannerSizes(size);

  // Responsive width
  const { width: windowWidth } = useWindowDimensions();
  const MAX_WIDTH = 3000; // ajusta si quieres otro máximo en pantallas grandes
  const containerWidth = Math.min(windowWidth, MAX_WIDTH);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-imageHeight, 0, imageHeight],
            [-imageHeight / 2, 0, imageHeight * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-imageHeight, 0, imageHeight], [2, 1, 1]),
        },
      ],
    };
  });

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, imageHeight / 2], [1, 0]),
    };
  });

  return (
    <View
      style={[
        bannerStyles.imageContainer,
        { height: imageHeight, width: containerWidth, alignSelf: 'center' },
      ]}>
      <Animated.Image
        source={imageSource}
        style={[bannerStyles.image, { height: imageHeight, width: '100%' }, imageAnimatedStyle]}
        resizeMode="cover"
      />

      <View style={bannerStyles.overlay} />

      <Animated.View style={[bannerStyles.contentOverlay, overlayAnimatedStyle]}>
        <Text style={[bannerStyles.title, { fontSize: titleSize }]}>{title}</Text>
        <Text style={[bannerStyles.subtitle, { fontSize: subtitleSize }]}>{subtitle}</Text>
        <Button
          style={[bannerStyles.button, { paddingVertical: buttonPadding }]}
          onPress={onButtonPress}>
          <UIText style={bannerStyles.buttonText}>{buttonText}</UIText>
        </Button>
      </Animated.View>
    </View>
  );
};

export default Banner;
