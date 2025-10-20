import React, { useState, useMemo, useEffect } from 'react';
import { View, Alert } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { OrderItemCard } from '@/components/custom/pedidos/ItemCard';
import { Pagination } from '@/components/custom/pedidos/Pagination';
import OrderDetailsDialog from '@/components/custom/pedidos/DialogPedidos';
import type { Order } from '@/components/custom/pedidos/ItemCard';
import Banner from '@/components/custom/banner/banner';
import LormanFooter from '@/components/custom/Footer';
import { getAllOrders } from '@/api/orders';
import { useAuth } from '@/context/AuthContext';

// Datos de ejemplo para simular la respuesta de una API

const ITEMS_PER_PAGE = 50;

export default function MisPedidosScreen() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  // 1. Filtrar pedidos solo para el cliente actual

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(50, 0);
        const mappedOrders: Order[] = response.orders.map((order: any) => ({
          id_pedido: order.id_pedido.toString(), // Convertir a string
          id_cliente: order.id_cliente,
          fecha_pedido: order.fecha_pedido,
          monto_total: order.monto_total,
          estado_entrega: order.estado_entrega as 'entregado' | 'en_camino' | 'cancelado' | 'pendiente',
        }));

        // Filtrar solo los pedidos del cliente actual
        const filteredOrders = mappedOrders.filter(
          (order) => order.id_cliente === user?.id_usuario
        );

        setOrders(filteredOrders);
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      }
    };
    fetchOrders();
  }, []);

  // 2. Lógica de Paginación
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPedidos = orders.slice(startIndex, endIndex);

  // 3. Handlers para las acciones de las tarjetas
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setDialogVisible(false);
    setSelectedOrder(null);
  };

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <>
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

          {orders.length > 0 ? (
            <View className="gap-4">
              {orders.map((pedido) => (
                <OrderItemCard
                  key={pedido.id_pedido}
                  order={pedido}
                  onViewDetails={handleViewDetails}
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
        <LormanFooter />
      </Animated.ScrollView>

      {/* Dialog de Detalles */}
      <OrderDetailsDialog
        order={selectedOrder as any}
        visible={dialogVisible}
        onClose={handleCloseDialog}
      />
    </>
  );
}
