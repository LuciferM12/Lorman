import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Calendar, TrendingUp } from 'lucide-react-native';

type MonthlyOrders = {
  mes: string;
  cantidad_pedidos: number;
  monto_total: number;
};

const { width } = Dimensions.get('window');
const chartWidth = Math.min(width - 80, 600);

export default function OrdersByMonthChart() {
  // Simular datos agregados de pedidos
  // En producción esto vendría de tu API:
  // SELECT 
  //   DATE_FORMAT(fecha_pedido, '%Y-%m') as mes,
  //   COUNT(*) as cantidad_pedidos,
  //   SUM(monto_total) as monto_total
  // FROM pedidos
  // WHERE fecha_pedido >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
  // GROUP BY mes
  // ORDER BY mes ASC

  const monthlyOrders: MonthlyOrders[] = [
    { mes: 'May', cantidad_pedidos: 145, monto_total: 32400 },
    { mes: 'Jun', cantidad_pedidos: 178, monto_total: 41200 },
    { mes: 'Jul', cantidad_pedidos: 203, monto_total: 48900 },
    { mes: 'Ago', cantidad_pedidos: 189, monto_total: 44100 },
    { mes: 'Sep', cantidad_pedidos: 234, monto_total: 58700 },
    { mes: 'Oct', cantidad_pedidos: 267, monto_total: 67300 },
  ];

  // Calcular tendencia
  const firstMonth = monthlyOrders[0].cantidad_pedidos;
  const lastMonth = monthlyOrders[monthlyOrders.length - 1].cantidad_pedidos;
  const growthPercentage = ((lastMonth - firstMonth) / firstMonth) * 100;

  // Preparar datos para el chart
  const chartData = {
    labels: monthlyOrders.map(m => m.mes),
    datasets: [
      {
        data: monthlyOrders.map(m => m.cantidad_pedidos),
        color: (opacity = 1) => `rgba(23, 162, 184, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  return (
    <Card>
      <CardContent className="p-6">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Calendar size={20} color="#3b82f6" />
            </View>
            <View>
              <Text className="text-lg font-bold text-gray-800">
                Pedidos por Mes
              </Text>
              <Text className="text-sm text-gray-600">
                Últimos 6 meses
              </Text>
            </View>
          </View>

          {/* Indicador de Crecimiento */}
          <View className="flex-row items-center gap-1 rounded-full bg-green-100 px-3 py-1">
            <TrendingUp size={16} color="#10b981" />
            <Text className="text-sm font-bold text-green-700">
              +{growthPercentage.toFixed(1)}%
            </Text>
          </View>
        </View>

        {/* Line Chart */}
        <View className="items-center">
          <LineChart
            data={chartData}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(23, 162, 184, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#17a2b8',
              },
              propsForBackgroundLines: {
                strokeDasharray: '',
                stroke: '#e5e5e5',
                strokeWidth: 1,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            withInnerLines
            withOuterLines
            withVerticalLines={false}
            withHorizontalLines
            withVerticalLabels
            withHorizontalLabels
          />
        </View>

        {/* Stats Resumen */}
        <View className="mt-6 flex-row gap-3">
          <View className="flex-1 rounded-lg bg-blue-50 p-4">
            <Text className="mb-1 text-xs font-semibold text-blue-700">
              Total Pedidos
            </Text>
            <Text className="text-2xl font-bold text-blue-900">
              {monthlyOrders.reduce((sum, m) => sum + m.cantidad_pedidos, 0)}
            </Text>
          </View>

          <View className="flex-1 rounded-lg bg-green-50 p-4">
            <Text className="mb-1 text-xs font-semibold text-green-700">
              Ingresos Totales
            </Text>
            <Text className="text-2xl font-bold text-green-900">
              ${monthlyOrders.reduce((sum, m) => sum + m.monto_total, 0).toLocaleString('es-MX')}
            </Text>
          </View>

          <View className="flex-1 rounded-lg bg-purple-50 p-4">
            <Text className="mb-1 text-xs font-semibold text-purple-700">
              Promedio/Mes
            </Text>
            <Text className="text-2xl font-bold text-purple-900">
              {Math.round(
                monthlyOrders.reduce((sum, m) => sum + m.cantidad_pedidos, 0) /
                  monthlyOrders.length
              )}
            </Text>
          </View>
        </View>

        {/* Tabla Detallada */}
        <View className="mt-6">
          <Text className="mb-3 text-sm font-semibold text-gray-700">
            Detalle Mensual
          </Text>
          <View className="gap-2">
            {monthlyOrders.map((month) => (
              <View
                key={month.mes}
                className="flex-row items-center justify-between rounded-lg border border-gray-200 p-3">
                <Text className="font-semibold text-gray-800">{month.mes} 2024</Text>
                <View className="flex-row items-center gap-4">
                  <View>
                    <Text className="text-xs text-gray-600">Pedidos</Text>
                    <Text className="font-bold text-gray-800">
                      {month.cantidad_pedidos}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-xs text-gray-600">Ingresos</Text>
                    <Text className="font-bold text-[#0d4682]">
                      ${month.monto_total.toLocaleString('es-MX')}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </CardContent>
    </Card>
  );
}