// components/cart/CartProductsList.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Pressable } from 'react-native';
import CartItem from './cartItem';

type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: any;
};

type CartProductsListProps = {
  items: CartItem[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onContinueShopping: () => void;
};

export default function CartProductsList({
  items,
  onIncrement,
  onDecrement,
  onRemove,
  onContinueShopping,
}: CartProductsListProps) {
  return (
    <Card>
      <CardContent className="p-6">
        {/* Header */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-800">Tus Productos</Text>
          <Text className="text-sm text-gray-600">{items.length} items</Text>
        </View>

        {/* Lista de Productos */}
        {items.length === 0 ? (
          <View className="py-8">
            <Text className="text-center text-gray-500">Tu carrito está vacío</Text>
          </View>
        ) : (
          <View className="gap-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                quantity={item.quantity}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onRemove={onRemove}
              />
            ))}
          </View>
        )}

        {/* Botón Seguir Comprando */}
        <Pressable onPress={onContinueShopping} className="mt-6">
          <Text className="text-sm text-[#17a2b8] underline">← Seguir comprando</Text>
        </Pressable>
      </CardContent>
    </Card>
  );
}