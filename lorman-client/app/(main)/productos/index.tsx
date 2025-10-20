import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import Banner from '@/components/custom/banner/banner';
import { ProductGrid } from '@/components/custom/products/productGrid';
import { Product } from '@/components/custom/products/productCard';
import FeatureCard from '@/components/custom/featureCard';
import { Feather } from '@expo/vector-icons';
import LormanFooter from '@/components/custom/Footer';
import { addItemToCart } from '@/api/cart';
import { useAuth } from '@/context/AuthContext';

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

const PRODUCTS: Product[] = [
  { id: 1, title: 'Garrafón de Agua Purificada', description: 'El agua más pura y fresca en nuestro práctico garrafón de 20 litros. Ideal para el hogar y la oficina.', price: '$45 MXN', backgroundColor: '#2A9FD8' },
  { id: 2, title: 'Hielo Cristalino en Bolsa', description: 'Perfecto para tus bebidas, fiestas y eventos. Nuestro hielo garantiza máxima duración y pureza.', price: '$35 MXN', backgroundColor: '#7DC8E8' },
  { id: 3, title: 'Agua Embotellada', description: 'Lleva la frescura de Lorman a donde vayas. Disponibles en presentaciones de 500ml y 1L.', price: '$12 MXN', backgroundColor: '#E8F4F8', textColor: '#003B5C' },
  { id: 4, title: 'Garrafón (2)', description: 'El agua más pura y fresca en nuestro práctico garrafón de 20 litros. Ideal para el hogar y la oficina.', price: '$45 MXN', backgroundColor: '#2A9FD8' },
  { id: 5, title: 'Hielo (2)', description: 'Perfecto para tus bebidas, fiestas y eventos. Nuestro hielo garantiza máxima duración y pureza.', price: '$35 MXN', backgroundColor: '#7DC8E8' },
  { id: 6, title: 'Agua Embotellada (2)', description: 'Lleva la frescura de Lorman a donde vayas. Disponibles en presentaciones de 500ml y 1L.', price: '$12 MXN', backgroundColor: '#E8F4F8', textColor: '#003B5C' },
];


const productos = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const { user } = useAuth();

  useEffect(() => {
    
  })

  const handleProductPressed = async (product: Product) => {
    console.log('Producto presionado:', product);
    await addItemToCart({
      id_usuario: user?.id_usuario!,
      id_producto: product.id,
      cantidad: 1,
    });
  };

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

        <ProductGrid onProductPress={handleProductPressed} products={PRODUCTS} />

        <Text className="mb-4 mt-9 text-center text-4xl font-bold text-primaryDark">
          Calidad en la que Puedes Confiar
        </Text>
        <Text className="mb-8 text-center text-xl text-primaryDark/75">
          Nuestro compromiso es con tu bienestar, por eso seguimos los más altos estándares de
          calidad.
        </Text>

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
    </View>
  );
};

export default productos;
