// app/(admin)/pedidos.tsx
import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { View, ScrollView, Pressable, Alert } from 'react-native';
import { Search, Calendar, Package, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react-native';

type Pedido = {
  id_pedido: number;
  id_cliente: number;
  nombre_cliente: string;
  fecha_pedido: string;
  direccion_entrega: string;
  monto_total: number;
  estado_entrega: string;
};

const ESTADOS = {
  pendiente: { color: 'bg-yellow-100 text-yellow-700', label: 'Pendiente' },
  en_proceso: { color: 'bg-blue-100 text-blue-700', label: 'En Proceso' },
  entregado: { color: 'bg-green-100 text-green-700', label: 'Entregado' },
  cancelado: { color: 'bg-red-100 text-red-700', label: 'Cancelado' },
};

const ITEMS_PER_PAGE = 5;

export default function PedidosScreen() {
  const [pedidos, setPedidos] = React.useState<Pedido[]>([
    {
      id_pedido: 1,
      id_cliente: 1,
      nombre_cliente: 'Juan Pérez García',
      fecha_pedido: '2024-10-15T10:30:00',
      direccion_entrega: 'Av. Carranza 1234, Centro, SLP',
      monto_total: 185.0,
      estado_entrega: 'entregado',
    },
    {
      id_pedido: 2,
      id_cliente: 2,
      nombre_cliente: 'María González López',
      fecha_pedido: '2024-10-18T08:15:00',
      direccion_entrega: 'Calle Hidalgo 567, Lomas, SLP',
      monto_total: 120.0,
      estado_entrega: 'en_proceso',
    },
    {
      id_pedido: 3,
      id_cliente: 1,
      nombre_cliente: 'Juan Pérez García',
      fecha_pedido: '2024-10-18T14:20:00',
      direccion_entrega: 'Av. Carranza 1234, Centro, SLP',
      monto_total: 95.0,
      estado_entrega: 'pendiente',
    },
    {
      id_pedido: 4,
      id_cliente: 4,
      nombre_cliente: 'Carlos Ramírez',
      fecha_pedido: '2024-10-17T09:00:00',
      direccion_entrega: 'Col. Moderna 890, SLP',
      monto_total: 200.0,
      estado_entrega: 'entregado',
    },
    {
      id_pedido: 5,
      id_cliente: 5,
      nombre_cliente: 'Ana Martínez',
      fecha_pedido: '2024-10-17T15:45:00',
      direccion_entrega: 'Av. Universidad 456, SLP',
      monto_total: 150.0,
      estado_entrega: 'en_proceso',
    },
    {
      id_pedido: 6,
      id_cliente: 2,
      nombre_cliente: 'María González López',
      fecha_pedido: '2024-10-16T11:00:00',
      direccion_entrega: 'Calle Hidalgo 567, Lomas, SLP',
      monto_total: 80.0,
      estado_entrega: 'pendiente',
    },
    {
      id_pedido: 7,
      id_cliente: 1,
      nombre_cliente: 'Juan Pérez García',
      fecha_pedido: '2024-10-14T13:30:00',
      direccion_entrega: 'Av. Carranza 1234, Centro, SLP',
      monto_total: 110.0,
      estado_entrega: 'cancelado',
    },
  ]);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterEstado, setFilterEstado] = React.useState<string>('todos');
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleChangeEstado = (id: number, nuevoEstado: string) => {
    setPedidos(pedidos.map((p) => (p.id_pedido === id ? { ...p, estado_entrega: nuevoEstado } : p)));
  };

  const handleViewDetails = (pedido: Pedido) => {
    Alert.alert(
      `Pedido #${pedido.id_pedido}`,
      `Cliente: ${pedido.nombre_cliente}\nTotal: $${pedido.monto_total}\nEstado: ${
        ESTADOS[pedido.estado_entrega as keyof typeof ESTADOS].label
      }`
    );
  };

  // Filtrar pedidos
  const filteredPedidos = pedidos.filter((p) => {
    const matchesSearch =
      p.nombre_cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id_pedido.toString().includes(searchQuery);
    const matchesFilter = filterEstado === 'todos' || p.estado_entrega === filterEstado;
    return matchesSearch && matchesFilter;
  });

  // Calcular estadísticas
  const stats = {
    total: pedidos.length,
    pendientes: pedidos.filter((p) => p.estado_entrega === 'pendiente').length,
    en_proceso: pedidos.filter((p) => p.estado_entrega === 'en_proceso').length,
    entregados: pedidos.filter((p) => p.estado_entrega === 'entregado').length,
  };

  // Calcular paginación
  const totalPages = Math.ceil(filteredPedidos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPedidos = filteredPedidos.slice(startIndex, endIndex);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterEstado]);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-8">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">Gestión de Pedidos</Text>
          <Text className="text-sm text-gray-600">
            Administra y da seguimiento a todos los pedidos
          </Text>
        </View>

        {/* Stats Cards */}
        <View className="mb-6 flex-row gap-4">
          <Card className="flex-1">
            <CardContent className="items-center p-4">
              <Text className="text-2xl font-bold text-gray-800">{stats.total}</Text>
              <Text className="text-xs text-gray-600">Total Pedidos</Text>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="items-center p-4">
              <Text className="text-2xl font-bold text-yellow-600">{stats.pendientes}</Text>
              <Text className="text-xs text-gray-600">Pendientes</Text>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="items-center p-4">
              <Text className="text-2xl font-bold text-blue-600">{stats.en_proceso}</Text>
              <Text className="text-xs text-gray-600">En Proceso</Text>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="items-center p-4">
              <Text className="text-2xl font-bold text-green-600">{stats.entregados}</Text>
              <Text className="text-xs text-gray-600">Entregados</Text>
            </CardContent>
          </Card>
        </View>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <View className="flex-row items-center gap-4">
              <View className="flex-1 flex-row items-center gap-2">
                <Search size={20} color="#666" />
                <Input
                  placeholder="Buscar por cliente o ID..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1"
                />
              </View>

              <View className="flex-row gap-2">
                {['todos', 'pendiente', 'en_proceso', 'entregado'].map((estado) => (
                  <Pressable
                    key={estado}
                    onPress={() => setFilterEstado(estado)}
                    className={`rounded-lg px-4 py-2 ${
                      filterEstado === estado ? 'bg-[#17a2b8]' : 'bg-gray-200'
                    }`}>
                    <Text
                      className={`text-sm font-semibold ${
                        filterEstado === estado ? 'text-white' : 'text-gray-700'
                      }`}>
                      {estado === 'todos' ? 'Todos' : ESTADOS[estado as keyof typeof ESTADOS]?.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Orders List */}
        <View className="gap-4">
          {currentPedidos.map((pedido) => (
            <Card key={pedido.id_pedido}>
              <CardContent className="p-6">
                <View className="flex-row items-start justify-between">
                  {/* Order Info */}
                  <View className="flex-1 gap-3">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-lg font-bold text-gray-800">
                        Pedido #{pedido.id_pedido}
                      </Text>
                      <View
                        className={`rounded-full px-3 py-1 ${
                          ESTADOS[pedido.estado_entrega as keyof typeof ESTADOS].color
                        }`}>
                        <Text className="text-xs font-semibold">
                          {ESTADOS[pedido.estado_entrega as keyof typeof ESTADOS].label}
                        </Text>
                      </View>
                    </View>

                    <View className="gap-2">
                      <View className="flex-row items-center gap-2">
                        <Package size={16} color="#666" />
                        <Text className="text-sm font-medium text-gray-800">
                          {pedido.nombre_cliente}
                        </Text>
                      </View>

                      <View className="flex-row items-center gap-2">
                        <Calendar size={16} color="#666" />
                        <Text className="text-sm text-gray-600">
                          {new Date(pedido.fecha_pedido).toLocaleString('es-MX', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          })}
                        </Text>
                      </View>

                      <View className="flex-row items-center gap-2">
                        <DollarSign size={16} color="#666" />
                        <Text className="text-sm font-semibold text-gray-800">
                          ${pedido.monto_total.toFixed(2)}
                        </Text>
                      </View>

                      <Text className="text-sm text-gray-600">{pedido.direccion_entrega}</Text>
                    </View>

                    {/* Estado Selector */}
                    <View className="mt-2 flex-row gap-2">
                      <Text className="text-xs font-semibold text-gray-700">Cambiar estado:</Text>
                      {Object.keys(ESTADOS).map((estado) => (
                        <Pressable
                          key={estado}
                          onPress={() => handleChangeEstado(pedido.id_pedido, estado)}
                          className={`rounded px-2 py-1 ${
                            pedido.estado_entrega === estado ? 'bg-[#17a2b8]' : 'bg-gray-200'
                          }`}>
                          <Text
                            className={`text-xs ${
                              pedido.estado_entrega === estado
                                ? 'font-semibold text-white'
                                : 'text-gray-600'
                            }`}>
                            {ESTADOS[estado as keyof typeof ESTADOS].label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  {/* View Details */}
                  <Pressable
                    onPress={() => handleViewDetails(pedido)}
                    className="rounded bg-gray-100 px-4 py-2">
                    <Text className="text-sm font-semibold text-gray-700">Ver Detalles</Text>
                  </Pressable>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>

        {filteredPedidos.length === 0 && (
          <View className="py-8">
            <Text className="text-center text-gray-500">No se encontraron pedidos</Text>
          </View>
        )}

        {/* Pagination */}
        {filteredPedidos.length > 0 && (
          <View className="mt-6 flex-row items-center justify-between">
            <Text className="text-sm text-gray-600">
              Mostrando {startIndex + 1} - {Math.min(endIndex, filteredPedidos.length)} de{' '}
              {filteredPedidos.length} pedidos
            </Text>

            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`flex-row items-center gap-1 rounded-lg px-3 py-2 ${
                  currentPage === 1 ? 'bg-gray-100' : 'border border-gray-300 bg-white'
                }`}>
                <ChevronLeft size={16} color={currentPage === 1 ? '#ccc' : '#666'} />
                <Text className={`text-sm ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700'}`}>
                  Anterior
                </Text>
              </Pressable>

              <View className="flex-row gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Pressable
                    key={page}
                    onPress={() => setCurrentPage(page)}
                    className={`h-10 w-10 items-center justify-center rounded-lg ${
                      currentPage === page ? 'bg-[#17a2b8]' : 'border border-gray-300 bg-white'
                    }`}>
                    <Text
                      className={`text-sm font-semibold ${
                        currentPage === page ? 'text-white' : 'text-gray-700'
                      }`}>
                      {page}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`flex-row items-center gap-1 rounded-lg px-3 py-2 ${
                  currentPage === totalPages ? 'bg-gray-100' : 'border border-gray-300 bg-white'
                }`}>
                <Text
                  className={`text-sm ${
                    currentPage === totalPages ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                  Siguiente
                </Text>
                <ChevronRight size={16} color={currentPage === totalPages ? '#ccc' : '#666'} />
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}