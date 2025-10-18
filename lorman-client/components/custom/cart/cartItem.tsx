// components/cart/CartItem.tsx
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Pressable } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';

type CartItemProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function CartItem({
  id,
  name,
  description,
  price,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const totalPrice = price * quantity;

  return (
    <View className="flex-row gap-4 border-b border-gray-200 pb-4 last:border-b-0">
      {/* Imagen del producto */}
      <View className="h-20 w-20 items-center justify-center rounded-lg bg-[#17a2b8]">
        <Text className="text-center text-sm font-bold text-white">
          {name.split(' ')[0]}
        </Text>
      </View>

      {/* Información del producto */}
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-base font-semibold text-gray-800">{name}</Text>
          <Text className="text-sm text-gray-600">{description}</Text>
        </View>

        {/* Controles de cantidad y precio */}
        <View className="flex-row items-center justify-between">
          {/* Controles de cantidad */}
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => onDecrement(id)}
              className="h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white">
              <Minus size={16} color="#666" />
            </Pressable>

            <Text className="w-8 text-center text-sm font-semibold text-gray-800">
              {quantity}
            </Text>

            <Pressable
              onPress={() => onIncrement(id)}
              className="h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white">
              <Plus size={16} color="#666" />
            </Pressable>
          </View>

          {/* Precio */}
          <Text className="text-lg font-bold text-[#0d4682]">
            ${totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Botón Eliminar */}
      <Pressable onPress={() => onRemove(id)} className="items-center justify-center">
        <Text className="text-xs text-red-500 underline">Eliminar</Text>
      </Pressable>
    </View>
  );
}