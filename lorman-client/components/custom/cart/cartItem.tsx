import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Pressable, Image } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';

type CartItemProps = {
  id: number;
  name: string;
  id_detalle_carrito: number;
  image?: string;
  description: string | undefined; 
  price: number;
  quantity: number;
  loading?: boolean;
  onIncrement: (id_producto: number, id_detalle_carrito: number) => void;
  onDecrement: (id_producto: number, id_detalle_carrito: number) => void;
  onRemove: (id: number) => void;
};

export default function CartItem({
  id,
  name,
  id_detalle_carrito,
  description,
  image,
  price,
  loading,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const totalPrice = price * quantity;

  return (
    <View className="flex-row gap-4 border-b border-gray-200 pb-4 last:border-b-0">
      {/* Imagen del producto */}
      {image ? (
        <Image source={{ uri: image }} className="h-20 w-20 rounded-lg" />
      ) : (
        <View className="h-20 w-20 items-center justify-center rounded-lg bg-[#17a2b8]">
          <Text className="text-center text-sm font-bold text-white">
            {name.split(' ')[0]}
          </Text>
        </View>
      )}

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
              onPress={() => onDecrement(id, id_detalle_carrito)}
              disabled={quantity <= 1 || loading}
              className="h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white">
              <Minus size={16} color="#666" />
            </Pressable>

            <Text className="w-8 text-center text-sm font-semibold text-gray-800">
              {quantity}
            </Text>

            <Pressable
              onPress={() => onIncrement(id, id_detalle_carrito)}
              disabled={loading}
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
      <Pressable onPress={() => onRemove(id_detalle_carrito)} className="items-center justify-center">
        <Text className="text-xs text-red-500 underline">Eliminar</Text>
      </Pressable>
    </View>
  );
}
