import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';
import TopProductsChart from '@/components/custom/dashboard/TopProductsChart';
import OrdersByMonthChart from '@/components/custom/dashboard/OrdersByMonthChart';
import {
  DollarSign,
  ShoppingCart,
  UserCheck,
  TrendingUp,
} from 'lucide-react-native';

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  iconBgColor: string;
  isCompact?: boolean;
  isMedium?: boolean;
};

const StatCard = ({ icon, title, value, iconBgColor, isCompact, isMedium }: StatCardProps) => (
  <Card className="flex-1 min-w-[160px]">
    <CardContent className={`flex-row items-center gap-3 ${isCompact ? 'p-3' : isMedium ? 'p-5' : 'p-6'}`}>
      <View className={`${isCompact ? 'h-9 w-9' : isMedium ? 'h-12 w-12' : 'h-14 w-14'} items-center justify-center rounded-full ${iconBgColor}`}>
        {React.cloneElement(icon as React.ReactElement<any>, { 
          size: isCompact ? 18 : isMedium ? 22 : 26 
        })}
      </View>
      <View className="flex-1">
        <Text 
          className={`${isCompact ? 'text-[10px]' : isMedium ? 'text-xs' : 'text-sm'} text-gray-600 mb-0.5`} 
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text className={`${isCompact ? 'text-lg' : isMedium ? 'text-xl' : 'text-2xl'} font-bold text-gray-800`}>
          {value}
        </Text>
      </View>
    </CardContent>
  </Card>
);

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  
  // Breakpoints responsivos
  const isSmall = width < 640;
  const isMedium = width >= 640 && width < 1024;
  const isLarge = width >= 1024;
  
  // Configuración de columnas para stats
  const statsColumnClass = isSmall 
    ? 'flex-col' 
    : isMedium 
    ? 'flex-row flex-wrap' 
    : 'flex-row';

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className={`p-4 ${isMedium ? 'p-6' : ''} ${isLarge ? 'p-8' : ''}`}>
        {/* Dashboard Title */}
        <Text className={`mb-${isSmall ? '3' : '6'} ${isSmall ? 'text-xl' : isMedium ? 'text-2xl' : 'text-3xl'} font-bold text-gray-800`}>
          Dashboard de Ventas
        </Text>

        {/* Stats Cards - Responsivo */}
        <View className={`mb-${isSmall ? '4' : '6'} ${statsColumnClass} gap-${isSmall ? '2' : '3'} ${isMedium ? 'gap-4' : ''}`}>
          <StatCard
            icon={<DollarSign color="#fff" />}
            title="Ingresos del Mes"
            value="$12,450"
            iconBgColor="bg-green-500"
            isCompact={isSmall}
            isMedium={isMedium}
          />
          <StatCard
            icon={<ShoppingCart color="#fff" />}
            title="Pedidos Nuevos (Hoy)"
            value="32"
            iconBgColor="bg-blue-500"
            isCompact={isSmall}
            isMedium={isMedium}
          />
          <StatCard
            icon={<UserCheck color="#fff" />}
            title="Clientes Totales"
            value="1,204"
            iconBgColor="bg-yellow-500"
            isCompact={isSmall}
            isMedium={isMedium}
          />
          <StatCard
            icon={<TrendingUp color="#fff" />}
            title="Tasa de Conversión"
            value="5.8%"
            iconBgColor="bg-purple-500"
            isCompact={isSmall}
            isMedium={isMedium}
          />
        </View>

        {/* Charts Section - Stack en móvil, lado a lado en desktop */}
        <View className={`gap-${isSmall ? '3' : '4'} ${isMedium ? 'gap-5' : ''}`}>
          <OrdersByMonthChart />
          <TopProductsChart />
        </View>
      </View>
    </ScrollView>
  );
}