import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Pressable, Alert } from 'react-native';
import { Pencil, Trash2 } from 'lucide-react-native';

export type Promocion = {
  id: number;
  titulo: string;
  descripcion: string;
  fechaVencimiento: string;
};

type PromocionListProps = {
  promociones: Promocion[];
  onEdit?: (promocion: Promocion) => void;
  onDelete: (id: number) => void;
};

export default function PromocionList({ promociones, onEdit, onDelete }: PromocionListProps) {
  const handleDelete = (id: number) => {
    Alert.alert('Eliminar Promoción', '¿Estás seguro de eliminar esta promoción?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => onDelete(id),
      },
    ]);
  };

  return (
    <View>
      <Text className="mb-3 text-base font-semibold text-gray-800">Promociones Actuales</Text>

      {promociones.length === 0 ? (
        <View className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8">
          <Text className="text-center text-gray-500">No hay promociones activas</Text>
        </View>
      ) : (
        <View className="gap-3">
          {promociones.map((promo) => (
            <View
              key={promo.id}
              className="flex-row items-start justify-between rounded-lg border border-gray-200 bg-white p-4">
              <View className="flex-1">
                <Text className="font-semibold text-gray-800">{promo.titulo}</Text>
                <Text className="text-sm text-gray-600">
                  {promo.descripcion} - Válido hasta el {promo.fechaVencimiento}
                </Text>
              </View>

              <View className="flex-row gap-2">
                {onEdit && (
                  <Pressable onPress={() => onEdit(promo)} className="rounded bg-blue-100 p-2">
                    <Pencil size={16} color="#2563eb" />
                  </Pressable>
                )}
                <Pressable onPress={() => handleDelete(promo.id)} className="rounded bg-red-100 p-2">
                  <Trash2 size={16} color="#dc2626" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}