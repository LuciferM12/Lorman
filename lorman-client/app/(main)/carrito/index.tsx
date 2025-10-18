// screens/ShoppingCartScreen.tsx
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import CartProductsList from '@/components/custom/cart/cartProductList';
import CartSummary from '@/components/custom/cart/cartSummary';
import LormanFooter from '@/components/custom/Footer';

type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: any;
};

export default function ShoppingCartScreen() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      id: '1',
      name: 'Garrafón de Agua Purificada',
      description: '20 Litros',
      price: 80.0,
      quantity: 2,
      image: require('@/assets/images/agua.jpg'),
    },
    {
      id: '2',
      name: 'Hielo Cristalino en Bolsa',
      description: '5 kg',
      price: 25.0,
      quantity: 1,
      image: require('@/assets/images/agua.jpg'),
    },
  ]);

  const shippingCost = 15.0;

  // Calcular subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  // Incrementar cantidad
  const incrementQuantity = (id: string) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  // Decrementar cantidad
  const decrementQuantity = (id: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Eliminar item
  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    console.log('Proceder al pago...');
    // Aquí va tu lógica de pago
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
