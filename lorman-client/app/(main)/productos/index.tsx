import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import Banner from '@/components/custom/banner/banner';
import { ProductGrid } from '@/components/custom/products/productGrid';
import { Product } from '@/components/custom/products/productCard';
import LormanFooter from '@/components/custom/Footer';
import { addItemToCart } from '@/api/cart';
import { useAuth } from '@/context/AuthContext';
import { getProducts } from '@/api/products';
import { ProductReturnDTO } from '@/interfaces/IProduct';

const productos = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const { user } = useAuth();
  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getProducts();
        const setproducts = products.map((prod: ProductReturnDTO) => ({
          id: prod.id_producto,
          title: prod.nombre_producto,
          description: prod.descripcion,
          price: `$${prod.precio_unitario} MXN`,
          backgroundColor: '#2A9FD8', // Puedes asignar colores dinámicamente si lo deseas
          imagen: prod.imagen
        }));
        setProducts(setproducts);
        console.log('Productos obtenidos:', setproducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleProductPressed = async (product: Product) => {
    console.log('Producto presionado:', product);

    try {
      await addItemToCart({
        id_usuario: user?.id_usuario!,
        id_producto: product.id,
        cantidad: 1,
      });
      console.log(`Producto ${product.title} agregado al carrito.`);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
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

        <ProductGrid onProductPress={handleProductPressed} products={products} />

        <View className="mb-4 mt-9 px-4 md:px-8 lg:px-16">
          <Text className="text-center text-2xl font-bold text-primaryDark sm:text-3xl md:text-4xl lg:text-5xl">
            Calidad en la que Puedes Confiar
          </Text>
        </View>
        <View className="mb-8 px-4 md:px-8 lg:px-16">
          <Text className="text-center text-base text-primaryDark/75 sm:text-lg md:text-xl lg:text-2xl">
            Nuestro compromiso es con tu bienestar, por eso seguimos los más altos estándares de
            calidad.
          </Text>
        </View>

        
        <LormanFooter />
      </Animated.ScrollView>
    </View>
  );
};

export default productos;
