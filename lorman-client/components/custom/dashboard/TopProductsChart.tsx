import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';
import { View, useWindowDimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Trophy } from 'lucide-react-native';

type ProductSale = {
  nombre_producto: string;
  cantidad_total: number;
  ingresos_totales: number;
};

export default function TopProductsChart() {
  const { width } = useWindowDimensions();
  
  const isSmall = width < 640;
  const isMedium = width >= 640 && width < 1024;
  const isLarge = width >= 1024;
  
  const chartWidth = Math.min(width - (isSmall ? 64 : isMedium ? 96 : 128), 800);

  const topProducts: ProductSale[] = [
    {
      nombre_producto: 'Garrafón de Agua',
      cantidad_total: 245,
      ingresos_totales: 19600,
    },
    {
      nombre_producto: 'Hielo en Bolsa',
      cantidad_total: 178,
      ingresos_totales: 4450,
    },
    {
      nombre_producto: 'Agua Embotellada 1L',
      cantidad_total: 156,
      ingresos_totales: 7020,
    },
    {
      nombre_producto: 'Botella 500ml',
      cantidad_total: 89,
      ingresos_totales: 1068,
    },
    {
      nombre_producto: 'Hielo Premium',
      cantidad_total: 67,
      ingresos_totales: 3015,
    },
  ];

  const chartData = {
    labels: topProducts.map(p => 
      isSmall 
        ? p.nombre_producto.substring(0, 6) + '...'
        : isMedium
        ? p.nombre_producto.substring(0, 10) + '...'
        : p.nombre_producto.length > 14 
        ? p.nombre_producto.substring(0, 14) + '...' 
        : p.nombre_producto
    ),
    datasets: [
      {
        data: topProducts.map(p => p.cantidad_total),
      },
    ],
  };

  return (
    <Card>
      <CardContent className={`${isSmall ? 'p-3' : isMedium ? 'p-5' : 'p-6'}`}>
        <View className={`mb-${isSmall ? '3' : '4'} flex-row items-center gap-2`}>
          <View className={`${isSmall ? 'h-8 w-8' : isMedium ? 'h-9 w-9' : 'h-10 w-10'} items-center justify-center rounded-full bg-amber-100`}>
            <Trophy size={isSmall ? 16 : isMedium ? 18 : 20} color="#f59e0b" />
          </View>
          <View className="flex-1">
            <Text className={`${isSmall ? 'text-sm' : isMedium ? 'text-base' : 'text-lg'} font-bold text-gray-800`}>
              Productos Más Vendidos
            </Text>
            <Text className={`${isSmall ? 'text-[10px]' : 'text-xs'} text-gray-600`}>
              Top 5 por cantidad vendida
            </Text>
          </View>
        </View>

        {/* Bar Chart con scroll horizontal */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="items-center">
            <BarChart
              data={chartData}
              width={Math.max(chartWidth, 320)}
              height={isSmall ? 160 : isMedium ? 200 : 240}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(23, 162, 184, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForLabels: {
                  fontSize: isSmall ? 9 : isMedium ? 11 : 12,
                },
                propsForBackgroundLines: {
                  strokeDasharray: '',
                  stroke: '#e5e5e5',
                  strokeWidth: 1,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              showValuesOnTopOfBars
              fromZero
            />
          </View>
        </ScrollView>

        {/* Lista Detallada */}
        <View className={`mt-${isSmall ? '4' : '6'} gap-2`}>
          {topProducts.map((product, index) => (
            <View
              key={product.nombre_producto}
              className={`${isSmall ? 'flex-col gap-2' : 'flex-row items-center justify-between'} rounded-lg bg-gray-50 p-${isSmall ? '2.5' : '3'}`}>
              <View className="flex-row items-center gap-3">
                <View
                  className={`${isSmall ? 'h-6 w-6' : isMedium ? 'h-7 w-7' : 'h-8 w-8'} items-center justify-center rounded-full ${
                    index === 0
                      ? 'bg-amber-500'
                      : index === 1
                      ? 'bg-gray-400'
                      : index === 2
                      ? 'bg-orange-400'
                      : 'bg-blue-400'
                  }`}>
                  <Text className={`${isSmall ? 'text-[10px]' : 'text-xs'} font-bold text-white`}>
                    {index + 1}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className={`${isSmall ? 'text-xs' : isMedium ? 'text-sm' : 'text-base'} font-semibold text-gray-800`} numberOfLines={1}>
                    {product.nombre_producto}
                  </Text>
                  <Text className={`${isSmall ? 'text-[10px]' : 'text-xs'} text-gray-600`}>
                    {product.cantidad_total} unidades
                  </Text>
                </View>
              </View>
              <Text className={`${isSmall ? 'text-sm self-end' : isMedium ? 'text-base' : 'text-lg'} font-bold text-[#0d4682]`}>
                ${product.ingresos_totales.toLocaleString('es-MX')}
              </Text>
            </View>
          ))}
        </View>
      </CardContent>
    </Card>
  );
}