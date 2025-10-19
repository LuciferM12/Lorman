import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Pressable } from 'react-native';
import { CartItem as ICartItem } from '@/interfaces/ICart';
import CartItem from './cartItem';


type CartProductsListProps = {
  items: ICartItem[];
  onIncrement: (id_producto: number, id_detalle_carrito: number) => void;
  onDecrement: (id_producto: number, id_detalle_carrito: number) => void;
  onRemove: (id: number) => void;
  onContinueShopping: () => void;
  loading?: boolean;
};

export default function CartProductsList({
  items,
  onIncrement,
  onDecrement,
  onRemove,
  onContinueShopping,
  loading,
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
                id_detalle_carrito={item.id_detalle_carrito}
                id={item.id}
                image={item.imagen}
                name={item.name}
                loading={loading}
                description={item.descripcion}
                price={item.precio}
                quantity={item.cantidad}
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
