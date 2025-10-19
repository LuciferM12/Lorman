import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Trophy } from 'lucide-react-native';

type ProductSale = {
  nombre_producto: string;
  cantidad_total: number;
  ingresos_totales: number;
};

const { width } = Dimensions.get('window');
const chartWidth = Math.min(width - 80, 600);

export default function TopProductsChart() {
  // Simular datos agregados de detalles_pedido
  // En producción esto vendría de tu API: 
  // SELECT p.nombre_producto, SUM(dp.cantidad) as cantidad_total, 
  //        SUM(dp.cantidad * dp.precio_al_momento) as ingresos_totales
  // FROM detalles_pedido dp
  // JOIN productos p ON dp.id_producto = p.id_producto
  // GROUP BY p.id_producto
  // ORDER BY cantidad_total DESC
  // LIMIT 5
  
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

  // Preparar datos para el chart
  const chartData = {
    labels: topProducts.map(p => 
      p.nombre_producto.length > 12 
        ? p.nombre_producto.substring(0, 12) + '...' 
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
      <CardContent className="p-6">
        <View className="mb-4 flex-row items-center gap-2">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-amber-100">
            <Trophy size={20} color="#f59e0b" />
          </View>
          <View>
            <Text className="text-lg font-bold text-gray-800">
              Productos Más Vendidos
            </Text>
            <Text className="text-sm text-gray-600">
              Top 5 por cantidad vendida
            </Text>
          </View>
        </View>

        {/* Bar Chart */}
        <View className="items-center">
          <BarChart
            data={chartData}
            width={chartWidth}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
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
              propsForLabels: {
                fontSize: 12,
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

        {/* Lista Detallada */}
        <View className="mt-6 gap-3">
          {topProducts.map((product, index) => (
            <View
              key={product.nombre_producto}
              className="flex-row items-center justify-between rounded-lg bg-gray-50 p-3">
              <View className="flex-row items-center gap-3">
                <View
                  className={`h-8 w-8 items-center justify-center rounded-full ${
                    index === 0
                      ? 'bg-amber-500'
                      : index === 1
                      ? 'bg-gray-400'
                      : index === 2
                      ? 'bg-orange-400'
                      : 'bg-blue-400'
                  }`}>
                  <Text className="text-sm font-bold text-white">{index + 1}</Text>
                </View>
                <View>
                  <Text className="font-semibold text-gray-800">
                    {product.nombre_producto}
                  </Text>
                  <Text className="text-xs text-gray-600">
                    {product.cantidad_total} unidades vendidas
                  </Text>
                </View>
              </View>
              <Text className="font-bold text-[#0d4682]">
                ${product.ingresos_totales.toLocaleString('es-MX')}
              </Text>
            </View>
          ))}
        </View>
      </CardContent>
    </Card>
  );
}