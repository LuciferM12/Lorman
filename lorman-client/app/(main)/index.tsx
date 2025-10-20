import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { type ImageStyle, View, StyleSheet } from 'react-native';
import Banner from '@/components/custom/banner/banner';

import FeatureCard from '@/components/custom/featureCard';
import { Feather } from '@expo/vector-icons';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReviewGrid } from '@/components/custom/reviews/reviewGrid';
import { ReviewForm } from '@/components/custom/reviews/reviewForm';

import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import Promotions from '@/components/custom/promotions/promotions';

import LormanFooter from '@/components/custom/Footer';

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

const features: {
  iconName: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
}[] = [
  {
    iconName: 'target',
    title: 'Maxima pureza',
    description:
      'Procesos de purificación avanzados que eliminan impurezas y garantizan un sabor perfecto.',
  },
  {
    iconName: 'eye',
    title: 'Calidad Certificada',
    description:
      'Cumplimos con todas las normativas de salud para ofrecerte un producto seguro y confiable.',
  },
  {
    iconName: 'heart',
    title: 'Entrega a Domicilio',
    description:
      'Recibe tus productos directamente en la puerta de tu casa o negocio. ¡Fácil, rápido y seguro!',
  },
];

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
            <TabsTrigger value="reviews">
              <Text className="text-slate-800">Ver Opiniones</Text>
            </TabsTrigger>
            <TabsTrigger value="submit">
              <Text className="text-slate-800">Dejar Opinión</Text>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="mt-6">
            <ReviewGrid />
          </TabsContent>

          <TabsContent value="submit" className="mt-6">
            <ReviewForm />
          </TabsContent>
        </Tabs>
      </View>
      <View className="items-center justify-center bg-background px-4 py-10">
        <View className="w-full max-w-3xl overflow-hidden rounded-lg shadow-lg">
          <iframe 
        width="100%" 
        height="315" 
        src="https://www.youtube.com/embed/hKC4St-viX8?si=G8Qn3cZXOfDwTPuV" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
          />
        </View>
      </View>

      <View className="mb-16 mt-9 w-full flex-row items-start justify-around">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              iconName={feature.iconName}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </View>

      <LormanFooter />
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


