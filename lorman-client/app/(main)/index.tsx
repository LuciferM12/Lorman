import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View, StyleSheet } from 'react-native';
import Banner from '@/components/custom/banner/banner';


import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import Promotions from '@/components/custom/promotions/promotions';


const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const SCREEN_OPTIONS = {
  title: 'React Native Reusables',
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

export default function Screen() {
  const { colorScheme } = useColorScheme();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  
  return (
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
      <Banner
        size="large"
        title="Pureza que Refresca tu Vida"
        subtitle="Calidad y confianza en cada gota. Llevamos la frescura del agua y hielo Lorman directamente a tu hogar."
        buttonText="Descubre nuestros productos"
        imageSource={require("@/assets/images/agua.jpg")}
        scrollOffset={scrollOffset}
        onButtonPress={() => {
          console.log("Navegando a productos...");
        }}
      />
      <Promotions />
      
      <View style={styles.content}>
        <Text className="font-bold text-3xl text-center mt-20">
          Welcome to Lorman App!
        </Text>
        <Text className="text-center mt-4 px-6">
          Aqui falta agregar la info jeje, promos etc
        </Text>
      </View>
    </Animated.ScrollView>
  );
}


const styles = StyleSheet.create({
  content: {
    minHeight: 500,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
});

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
