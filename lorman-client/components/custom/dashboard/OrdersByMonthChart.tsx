import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';
import { View, Dimensions, useWindowDimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Calendar, TrendingUp } from 'lucide-react-native';

type MonthlyOrders = {
  mes: string;
  cantidad_pedidos: number;
  monto_total: number;
};

export default function OrdersByMonthChart() {
  const { width } = useWindowDimensions();
  
  // Breakpoints
  const isSmall = width < 640;
  const isMedium = width >= 640 && width < 1024;
  const isLarge = width >= 1024;
  
  // Chart width responsivo con padding
  const chartWidth = Math.min(width - (isSmall ? 64 : isMedium ? 96 : 128), 800);

  const monthlyOrders: MonthlyOrders[] = [
    { mes: 'May', cantidad_pedidos: 145, monto_total: 32400 },
    { mes: 'Jun', cantidad_pedidos: 178, monto_total: 41200 },
    { mes: 'Jul', cantidad_pedidos: 203, monto_total: 48900 },
    { mes: 'Ago', cantidad_pedidos: 189, monto_total: 44100 },
    { mes: 'Sep', cantidad_pedidos: 234, monto_total: 58700 },
    { mes: 'Oct', cantidad_pedidos: 267, monto_total: 67300 },
  ];

  const firstMonth = monthlyOrders[0].cantidad_pedidos;
  const lastMonth = monthlyOrders[monthlyOrders.length - 1].cantidad_pedidos;
  const growthPercentage = ((lastMonth - firstMonth) / firstMonth) * 100;

  const chartData = {
    labels: monthlyOrders.map(m => m.mes),
    datasets: [
      {
        data: monthlyOrders.map(m => m.cantidad_pedidos),
        color: (opacity = 1) => `rgba(23, 162, 184, ${opacity})`,
        strokeWidth: isSmall ? 2 : 3,
      },
    ],
  };

  return (
    <Card>
      <CardContent className={`${isSmall ? 'p-3' : isMedium ? 'p-5' : 'p-6'}`}>
        <View className={`mb-${isSmall ? '3' : '4'} ${isSmall ? 'flex-col gap-2' : 'flex-row items-center justify-between'}`}>
          <View className="flex-row items-center gap-2">
            <View className={`${isSmall ? 'h-8 w-8' : isMedium ? 'h-9 w-9' : 'h-10 w-10'} items-center justify-center rounded-full bg-blue-100`}>
              <Calendar size={isSmall ? 16 : isMedium ? 18 : 20} color="#3b82f6" />
            </View>
            <View>
              <Text className={`${isSmall ? 'text-sm' : isMedium ? 'text-base' : 'text-lg'} font-bold text-gray-800`}>
                Pedidos por Mes
              </Text>
              <Text className={`${isSmall ? 'text-[10px]' : 'text-xs'} text-gray-600`}>
                Últimos 6 meses
              </Text>
            </View>
          </View>

          <View className={`flex-row items-center gap-1 rounded-full bg-green-100 px-${isSmall ? '2' : '3'} py-1 self-start`}>
            <TrendingUp size={isSmall ? 12 : 14} color="#10b981" />
            <Text className={`${isSmall ? 'text-[10px]' : 'text-xs'} font-bold text-green-700`}>
              +{growthPercentage.toFixed(1)}%
            </Text>
          </View>
        </View>

        {/* Chart con scroll horizontal en móvil si es necesario */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="items-center">
            <LineChart
              data={chartData}
              width={Math.max(chartWidth, 320)}
              height={isSmall ? 160 : isMedium ? 200 : 240}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(23, 162, 184, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForDots: {
                  r: isSmall ? '3' : isMedium ? '5' : '6',
                  strokeWidth: '2',
                  stroke: '#17a2b8',
                },
                propsForBackgroundLines: {
                  strokeDasharray: '',
                  stroke: '#e5e5e5',
                  strokeWidth: 1,
                },
                propsForLabels: {
                  fontSize: isSmall ? 9 : isMedium ? 11 : 12,
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
            />
          </View>
        </ScrollView>

        {/* Stats Resumen - Stack en móvil, fila en tablet+ */}
        <View className={`mt-${isSmall ? '3' : '4'} ${isSmall ? 'flex-col gap-2' : 'flex-row gap-3'}`}>
          <View className={`flex-1 rounded-lg bg-blue-50 p-${isSmall ? '2.5' : '3'}`}>
            <Text className={`mb-1 ${isSmall ? 'text-[10px]' : 'text-xs'} font-semibold text-blue-700`}>
              Total Pedidos
            </Text>
            <Text className={`${isSmall ? 'text-lg' : isMedium ? 'text-xl' : 'text-2xl'} font-bold text-blue-900`}>
              {monthlyOrders.reduce((sum, m) => sum + m.cantidad_pedidos, 0)}
            </Text>
          </View>

          <View className={`flex-1 rounded-lg bg-green-50 p-${isSmall ? '2.5' : '3'}`}>
            <Text className={`mb-1 ${isSmall ? 'text-[10px]' : 'text-xs'} font-semibold text-green-700`}>
              Ingresos Totales
            </Text>
            <Text className={`${isSmall ? 'text-lg' : isMedium ? 'text-xl' : 'text-2xl'} font-bold text-green-900`}>
              ${monthlyOrders.reduce((sum, m) => sum + m.monto_total, 0).toLocaleString('es-MX')}
            </Text>
          </View>

          <View className={`flex-1 rounded-lg bg-purple-50 p-${isSmall ? '2.5' : '3'}`}>
            <Text className={`mb-1 ${isSmall ? 'text-[10px]' : 'text-xs'} font-semibold text-purple-700`}>
              Promedio/Mes
            </Text>
            <Text className={`${isSmall ? 'text-lg' : isMedium ? 'text-xl' : 'text-2xl'} font-bold text-purple-900`}>
              {Math.round(
                monthlyOrders.reduce((sum, m) => sum + m.cantidad_pedidos, 0) /
                  monthlyOrders.length
              )}
            </Text>
          </View>
        </View>

        {/* Tabla Detallada */}
        <View className={`mt-${isSmall ? '4' : '6'}`}>
          <Text className={`mb-${isSmall ? '2' : '3'} ${isSmall ? 'text-xs' : 'text-sm'} font-semibold text-gray-700`}>
            Detalle Mensual
          </Text>
          <View className="gap-2">
            {monthlyOrders.map((month) => (
              <View
                key={month.mes}
                className={`${isSmall ? 'flex-col gap-2' : 'flex-row items-center justify-between'} rounded-lg border border-gray-200 p-${isSmall ? '2.5' : '3'}`}>
                <Text className={`${isSmall ? 'text-xs' : isMedium ? 'text-sm' : 'text-base'} font-semibold text-gray-800`}>
                  {month.mes} 2024
                </Text>
                <View className={`flex-row items-center ${isSmall ? 'justify-between' : 'gap-4'}`}>
                  <View>
                    <Text className={`${isSmall ? 'text-[10px]' : 'text-xs'} text-gray-600`}>Pedidos</Text>
                    <Text className={`${isSmall ? 'text-sm' : isMedium ? 'text-base' : 'text-lg'} font-bold text-gray-800`}>
                      {month.cantidad_pedidos}
                    </Text>
                  </View>
                  <View>
                    <Text className={`${isSmall ? 'text-[10px]' : 'text-xs'} text-gray-600`}>Ingresos</Text>
                    <Text className={`${isSmall ? 'text-sm' : isMedium ? 'text-base' : 'text-lg'} font-bold text-[#0d4682]`}>
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