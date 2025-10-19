// app/(client)/mis-pedidos.tsx
import React, { useState, useMemo } from 'react';
import { View, Alert } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { OrderItemCard } from '@/components/custom/pedidos/ItemCard';
import { Pagination } from '@/components/custom/pedidos/Pagination';
import type { Order } from '@/components/custom/pedidos/ItemCard';
import Banner from '@/components/custom/banner/banner';
import LormanFooter from '@/components/custom/Footer';

// Datos de ejemplo para simular la respuesta de una API
const ALL_ORDERS_DATA: Order[] = [
    { id_pedido: 'LOR-54321', id_cliente: 1, fecha_pedido: '2025-10-15', monto_total: 120.00, estado_entrega: 'entregado' },
    { id_pedido: 'LOR-54119', id_cliente: 1, fecha_pedido: '2025-10-10', monto_total: 80.00, estado_entrega: 'en_camino' },
    { id_pedido: 'LOR-53987', id_cliente: 1, fecha_pedido: '2025-10-05', monto_total: 25.00, estado_entrega: 'cancelado' },
    { id_pedido: 'LOR-53986', id_cliente: 2, fecha_pedido: '2025-10-04', monto_total: 150.00, estado_entrega: 'entregado' },
    { id_pedido: 'LOR-53985', id_cliente: 1, fecha_pedido: '2025-10-03', monto_total: 300.00, estado_entrega: 'entregado' },
    { id_pedido: 'LOR-53984', id_cliente: 1, fecha_pedido: '2025-10-02', monto_total: 75.50, estado_entrega: 'cancelado' },
    { id_pedido: 'LOR-53983', id_cliente: 1, fecha_pedido: '2025-10-01', monto_total: 99.99, estado_entrega: 'en_camino' },
];

const ITEMS_PER_PAGE = 5; // Coincide con la imagen (3 pedidos por página)
const CURRENT_CLIENT_ID = 1; // Simula el ID del cliente que ha iniciado sesión

export default function MisPedidosScreen() {
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Filtrar pedidos solo para el cliente actual
  // `useMemo` optimiza para que el filtro no se ejecute en cada render, solo si los datos cambian.
  const clientOrders = useMemo(
    () => ALL_ORDERS_DATA.filter((order) => order.id_cliente === CURRENT_CLIENT_ID),
    [] // Array de dependencias vacío, ya que los datos son estáticos
  );

  // 2. Lógica de Paginación
  const totalPages = Math.ceil(clientOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPedidos = clientOrders.slice(startIndex, endIndex);

  // 3. Handlers para las acciones de las tarjetas
  const handleViewDetails = (order: Order) => {
    Alert.alert(
      `Detalles del Pedido #${order.id_pedido}`,
      `Monto: $${order.monto_total.toFixed(2)}\nEstado: ${order.estado_entrega}`
    );
  };

  const handleTrackShipment = (order: Order) => {
    Alert.alert(
      `Rastrear Envío #${order.id_pedido}`,
      'Aquí se mostraría la información de seguimiento de la paquetería.'
    );
  };

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

  

  return (
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
      <Banner
        size="small"
        title="Pedidos"
        subtitle="Verifica el estado de tus pedidos recientes y realiza un seguimiento de tus entregas."
        buttonText="Inicio"
        imageSource={require('@/assets/images/agua.jpg')}
        scrollOffset={scrollOffset}
        onButtonPress={() => {
          console.log('Navegando a productos...');
        }}
      />

      <View className="p-4 md:p-8">
        <Text className="mb-6 mt-6 text-2xl font-bold text-gray-800">Mis Pedidos</Text>

        {currentPedidos.length > 0 ? (
          <View className="gap-4">
            {currentPedidos.map((pedido) => (
              <OrderItemCard
                key={pedido.id_pedido}
                order={pedido}
                onViewDetails={handleViewDetails}
                onTrackShipment={handleTrackShipment}
              />
            ))}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-12">
            <Text className="text-center text-gray-500">Aún no tienes pedidos.</Text>
          </View>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </View>
      <LormanFooter/>
    </Animated.ScrollView>
  );
}