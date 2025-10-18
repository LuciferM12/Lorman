import React from 'react';
import { View, Text } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import Banner from '@/components/custom/banner/banner';
import { ProductGrid } from '@/components/custom/products/productGrid';
import { Product } from '@/components/custom/products/productCard';
import FeatureCard from '@/components/custom/featureCard';
import { Feather } from '@expo/vector-icons';

const handleProductPressed = (product: Product) => {
  console.log('Producto presionado:', product);
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

const productos = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <View className="flex-1 bg-white">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Banner
          size="small"
          title="Conoce nuestros Productos"
          subtitle="Aqui podras encontrar lo que buscas sobre nuestros productos."
          buttonText="Promociones activas"
          imageSource={require('@/assets/images/agua.jpg')}
          scrollOffset={scrollOffset}
          onButtonPress={() => {
            console.log('Navegando a productos...');
          }}
        />

        <ProductGrid onProductPress={handleProductPressed} />

        <Text className="mb-4 mt-9 text-center text-4xl font-bold text-primaryDark">
          Calidad en la que Puedes Confiar
        </Text>
        <Text className="mb-8 text-center text-xl text-primaryDark/75">
          Nuestro compromiso es con tu bienestar, por eso seguimos los más altos estándares de
          calidad.
        </Text>

        <View className="mb-8 mt-9 w-full flex-row items-start justify-around">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              iconName={feature.iconName}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default productos;
