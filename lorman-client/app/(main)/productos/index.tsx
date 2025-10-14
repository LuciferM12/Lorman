import Banner from '@/components/custom/banner/banner';
import Catalogue from '@/components/custom/catalogue/Catalogue';
import React from 'react';
import { View, Text } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';

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
          title="Comprometidos con tu Bienestar"
          subtitle="Conoce la historia y los valores que hacen de Lorman tu mejor opción."
          buttonText="Nuestros productos"
          imageSource={require('@/assets/images/agua.jpg')}
          scrollOffset={scrollOffset}
          onButtonPress={() => {
            console.log('Navegando a productos...');
          }}
        />

        <View className="flex items-center justify-center p-4 py-12">
          <View className="w-full max-w-[90%] items-center lg:w-[1920px]">
            <Text className="mb-4 text-center text-4xl font-bold text-primaryDark">
              Nuestros Productos
            </Text>
            <Text className="mb-8 text-center text-xl text-primaryDark/75">
              Explora nuestra variedad de productos diseñados para satisfacer tus necesidades de hidratación y bienestar.
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default productos;
