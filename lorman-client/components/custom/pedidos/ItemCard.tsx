
import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';

// Definimos los tipos de datos que espera el componente
export type Order = {
  id_pedido: string;
  id_cliente: number;
  fecha_pedido: string;
  monto_total: number;
  estado_entrega: 'entregado' | 'en_camino' | 'cancelado';
};

// Mapeo de estados para estilos y etiquetas, adaptado a la vista del cliente
const STATUSES = {
  entregado: { 
    label: 'Entregado', 
    badgeClass: 'bg-green-100', 
    textClass: 'text-green-800' 
  },
  en_camino: { 
    label: 'En Camino', 
    badgeClass: 'bg-yellow-100', 
    textClass: 'text-yellow-800' 
  },
  cancelado: { 
    label: 'Cancelado', 
    badgeClass: 'bg-red-100', 
    textClass: 'text-red-800' 
  },
};

interface OrderItemCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
}

export const OrderItemCard = ({ order, onViewDetails }: OrderItemCardProps) => {
  const statusInfo = STATUSES[order.estado_entrega];

  const formattedDate = new Date(order.fecha_pedido).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="w-full overflow-hidden rounded-lg bg-white shadow-sm">
      <CardContent className="p-4">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-lg font-bold text-gray-800">Pedido #{order.id_pedido}</Text>
            <Text className="text-sm text-gray-500">Realizado el {formattedDate}</Text>
          </View>
          <View className="items-end">
            <View className={`rounded-full px-3 py-1 ${statusInfo.badgeClass}`}>
              <Text className={`text-xs font-semibold ${statusInfo.textClass}`}>
                {statusInfo.label}
              </Text>
            </View>
            <Text className="mt-2 text-lg font-bold text-gray-900">
              ${order.monto_total.toFixed(2)}
            </Text>
          </View>
        </View>

        
        <View className="my-3 h-px bg-gray-200" />

        
        <View className="items-end">
            <Pressable onPress={() => onViewDetails(order)}>
              <Text className="text-sm font-semibold text-[#17a2b8]">Ver Detalles</Text>
            </Pressable>
        </View>
      </CardContent>
    </Card>
  );
};