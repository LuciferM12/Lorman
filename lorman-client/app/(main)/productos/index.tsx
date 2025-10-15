import React from 'react'
import { View, Text } from 'react-native'
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import Banner from '@/components/custom/banner/banner';
import { ProductGrid } from '@/components/custom/products/productGrid';
import { Product } from '@/components/custom/products/productCard';


const handleProductPressed = (product: Product) => {
  console.log('Producto presionado:', product);
}


const productos = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <View className='flex-1 bg-white'>
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

          <ProductGrid onProductPress={handleProductPressed}/>

      </Animated.ScrollView>
    </View>
  )
}

export default productos