// app/(admin)/dashboard.tsx
import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
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
};

const StatCard = ({ icon, title, value, iconBgColor }: StatCardProps) => (
  <Card className="flex-1">
    <CardContent className="flex-row items-center gap-4 p-6">
      <View className={`h-14 w-14 items-center justify-center rounded-full ${iconBgColor}`}>
        {icon}
      </View>
      <View>
        <Text className="text-sm text-gray-600">{title}</Text>
        <Text className="text-2xl font-bold text-gray-800">{value}</Text>
      </View>
    </CardContent>
  </Card>
);

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1">
      <View className="p-8">
        {/* Dashboard Title */}
        <Text className="mb-6 text-xl font-bold text-gray-800">Dashboard de Ventas</Text>

        {/* Stats Cards */}
        <View className="mb-8 flex-row gap-4">
          <StatCard
            icon={<DollarSign size={24} color="#fff" />}
            title="Ingresos del Mes"
            value="$12,450"
            iconBgColor="bg-green-500"
          />
          <StatCard
            icon={<ShoppingCart size={24} color="#fff" />}
            title="Pedidos Nuevos (Hoy)"
            value="32"
            iconBgColor="bg-blue-500"
          />
          <StatCard
            icon={<UserCheck size={24} color="#fff" />}
            title="Clientes Totales"
            value="1,204"
            iconBgColor="bg-yellow-500"
          />
          <StatCard
            icon={<TrendingUp size={24} color="#fff" />}
            title="Tasa de Conversión"
            value="5.8%"
            iconBgColor="bg-purple-500"
          />
        </View>

        {/* Welcome Card */}
        <Card>
          <CardContent className="p-6">
            <Text className="mb-3 text-lg font-bold text-gray-800">
              Bienvenido al Panel de Administración
            </Text>
            <Text className="mb-6 text-sm text-gray-600">
              Desde el menú de la izquierda puedes empezar a gestionar los diferentes aspectos
              de tu tienda. Esta área principal cambiará para mostrarte las herramientas de la
              sección que elijas.
            </Text>

            {/* Placeholder Content */}
            <View className="items-center justify-center rounded-lg bg-gray-100 py-20">
              <Text className="text-gray-500">
                Aquí se mostrará el contenido de la sección seleccionada
              </Text>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}