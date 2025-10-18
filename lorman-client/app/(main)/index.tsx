import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View, StyleSheet } from 'react-native';
import Banner from '@/components/custom/banner/banner';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReviewGrid } from '@/components/custom/reviews/reviewGrid';
import { ReviewForm } from '@/components/custom/reviews/reviewForm';

import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
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

  const [value, setValue] = useState('reviews');

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
      <Banner
        size="large"
        title="Pureza que Refresca tu Vida"
        subtitle="Calidad y confianza en cada gota. Llevamos la frescura del agua y hielo Lorman directamente a tu hogar."
        buttonText="Descubre nuestros productos"
        imageSource={require('@/assets/images/agua.jpg')}
        scrollOffset={scrollOffset}
        onButtonPress={() => {
          console.log('Navegando a productos...');
        }}
      />
      <Promotions />

      <View className="flex-1 bg-background p-10">
        <Text className="mb-4 mt-9 text-center text-4xl font-bold text-primaryDark">
          Reseñas y Opiniones
        </Text>
        <Text className="mb-8 text-center text-xl text-primaryDark/75">
          Tu opinión es muy importante para nosotros. Lee lo que otros clientes dicen o deja tu
          propia reseña.
        </Text>

        <Tabs value={value} onValueChange={setValue} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="reviews">Ver Opiniones</TabsTrigger>
            <TabsTrigger value="submit">Dejar Opinión</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="mt-6">
            <ReviewGrid />
          </TabsContent>

          <TabsContent value="submit" className="mt-6">
            <ReviewForm />
          </TabsContent>
        </Tabs>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    minHeight: 500,
    backgroundColor: '#fff',
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
