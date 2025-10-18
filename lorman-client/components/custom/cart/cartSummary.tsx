import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';

type CartSummaryProps = {
  subtotal: number;
  shippingCost: number;
  total: number;
  onCheckout: () => void;
  isDisabled?: boolean;
};

export default function CartSummary({
  subtotal,
  shippingCost,
  total,
  onCheckout,
  isDisabled = false,
}: CartSummaryProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <Text className="mb-4 text-lg font-semibold text-gray-800">Resumen del Pedido</Text>

        {/* Subtotal */}
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-sm text-gray-600">Subtotal</Text>
          <Text className="text-base font-semibold text-gray-800">${subtotal.toFixed(2)}</Text>
        </View>

        {/* Costo de Envío */}
        <View className="mb-4 flex-row items-center justify-between border-b border-gray-200 pb-4">
          <Text className="text-sm text-gray-600">Costo de Envío</Text>
          <Text className="text-base font-semibold text-gray-800">${shippingCost.toFixed(2)}</Text>
        </View>

        {/* Total */}
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-gray-800">Total</Text>
          <Text className="text-2xl font-bold text-[#0d4682]">${total.toFixed(2)}</Text>
        </View>

        {/* Botón Proceder al Pago */}
        <Button onPress={onCheckout} className="w-full bg-[#17a2b8]" disabled={isDisabled}>
          <Text className="font-semibold text-white">Proceder al Pago</Text>
        </Button>
      </CardContent>
    </Card>
  );
}
