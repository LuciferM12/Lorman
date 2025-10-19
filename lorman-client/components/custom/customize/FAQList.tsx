import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Pressable, Alert } from 'react-native';
import { Pencil, Trash2 } from 'lucide-react-native';

export type FAQ = {
  id: number;
  pregunta: string;
  respuesta: string;
};

type FAQListProps = {
  faqs: FAQ[];
  onEdit?: (faq: FAQ) => void;
  onDelete: (id: number) => void;
};

export default function FAQList({ faqs, onEdit, onDelete }: FAQListProps) {
  const handleDelete = (id: number) => {
    Alert.alert('Eliminar FAQ', '¿Estás seguro de eliminar esta pregunta?', [
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
      <Text className="mb-3 text-base font-semibold text-gray-800">Preguntas Actuales</Text>

      {faqs.length === 0 ? (
        <View className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8">
          <Text className="text-center text-gray-500">No hay preguntas frecuentes</Text>
        </View>
      ) : (
        <View className="gap-3">
          {faqs.map((faq) => (
            <View key={faq.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <View className="mb-2 flex-row items-start justify-between">
                <Text className="flex-1 font-semibold text-gray-800">{faq.pregunta}</Text>
                <View className="flex-row gap-2">
                  {onEdit && (
                    <Pressable onPress={() => onEdit(faq)} className="rounded bg-blue-100 p-2">
                      <Pencil size={16} color="#2563eb" />
                    </Pressable>
                  )}
                  <Pressable onPress={() => handleDelete(faq.id)} className="rounded bg-red-100 p-2">
                    <Trash2 size={16} color="#dc2626" />
                  </Pressable>
                </View>
              </View>
              <Text className="text-sm text-gray-600">{faq.respuesta}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}