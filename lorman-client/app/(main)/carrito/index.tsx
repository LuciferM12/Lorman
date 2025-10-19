import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import CartProductsList from '@/components/custom/cart/cartProductList';
import CartSummary from '@/components/custom/cart/cartSummary';
import LormanFooter from '@/components/custom/Footer';
import { CartItem } from '@/interfaces/ICart';
import { createCheckoutSession } from '@/api/cart';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';


export default function ShoppingCartScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const shippingCost = 15.0;

  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      id: 1,
      name: 'Garrafón de Agua Purificada',
      descripcion: '20 Litros',
      precio: 80.0,
      cantidad: 2,
      imagen: 'https://placehold.co/600x400/png'
    },
    {
      id: 2,
      name: 'Hielo Cristalino en Bolsa',
      descripcion: '5 kg',
      precio: 25.0,
      cantidad: 1,
      imagen: 'https://placehold.co/600x400/png'
    },
    {
      id: 3,
      name: 'Shipping cost',
      descripcion: 'Costo de envío estándar',
      precio: shippingCost,
      cantidad: 1,
      imagen: undefined
    }
  ]);

  

  // Calcular subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const total = subtotal;

  // Incrementar cantidad
  const incrementQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item))
    );
  };

  // Decrementar cantidad
  const decrementQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item
      )
    );
  };

  // Eliminar item
  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    const response = await createCheckoutSession(cartItems, user?.email || '');
    response.url && router.push(response.url);

  };

  const handleContinueShopping = () => {
    console.log('Continuar comprando...');
    // Navegar de regreso a la tienda
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 mt-20">
      <View className="p-6">
        {/* Título */}
        <Text className="mb-6 text-3xl font-bold text-[#0d4682]">Carrito de Compras</Text>

        <View className="gap-6 md:flex-row md:items-start">
          {/* Columna Izquierda - Productos */}
          <View className="flex-1">
            <CartProductsList
              items={cartItems}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
              onRemove={removeItem}
              onContinueShopping={handleContinueShopping}
            />
          </View>

          {/* Columna Derecha - Resumen */}
          <View className="w-full md:w-80">
            <CartSummary
              subtotal={subtotal}
              shippingCost={shippingCost}
              total={total}
              onCheckout={handleCheckout}
              isDisabled={cartItems.length === 0}
            />
          </View>
        </View>
      </View>
      <LormanFooter />
    </ScrollView>
  );
}
