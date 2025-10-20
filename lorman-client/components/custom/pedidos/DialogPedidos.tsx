import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { View, Modal, ScrollView, Pressable } from 'react-native';
import { X, Calendar, MapPin, User, ShoppingBag } from 'lucide-react-native';
import { getOrderById } from '@/api/orders';

// Tipados
type ProductoPedido = {
  id_producto: number;
  nombre_producto: string;
  descripcion: string | null;
};

type DetallePedido = {
  id_detalle_pedido: number;
  id_pedido: number;
  id_producto: number;
  cantidad: number;
  precio_al_momento: number;
  id_promocion_aplicada: number | null;
  productos: ProductoPedido | null;
};

type UsuarioPedido = {
  id_usuario: number;
  nombre_completo: string;
  email: string;
  telefono: string | null;
};

type PedidoAPI = {
  id_pedido: number;
  id_cliente: number;
  fecha_pedido: string;
  direccion_entrega: string;
  monto_total: number;
  estado_entrega: 'pendiente' | 'en_camino' | 'entregado' | 'cancelado';
  usuarios: UsuarioPedido | null;
  detalles_pedido: DetallePedido[];
};

type DetalleProducto = {
  id_producto: number;
  nombre_producto: string;
  cantidad: number;
  precio_unitario: number;
};

type OrderDetailsDialogProps = {
  order: { id_pedido: number } | null;
  visible: boolean;
  onClose: () => void;
};

const ESTADOS_CONFIG = {
  entregado: { color: '#10b981', bgColor: '#d1fae5', label: 'Entregado' },
  en_camino: { color: '#3b82f6', bgColor: '#dbeafe', label: 'En Camino' },
  cancelado: { color: '#ef4444', bgColor: '#fee2e2', label: 'Cancelado' },
  pendiente: { color: '#f59e0b', bgColor: '#fef3c7', label: 'Pendiente' },
};

export default function OrderDetailsDialog({ order, visible, onClose }: OrderDetailsDialogProps) {
  const [orderDetails, setOrderDetails] = React.useState<PedidoAPI | null>(null);

  React.useEffect(() => {
    if (!order) return;
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderById(order.id_pedido);
        setOrderDetails(data);
      } catch (error) {
        console.error('Error al obtener detalles del pedido:', error);
      }
    };
    fetchOrderDetails();
  }, [order]);

  if (!orderDetails) return null;

  const clienteInfo = orderDetails.usuarios
    ? {
        nombre: orderDetails.usuarios.nombre_completo,
        telefono: orderDetails.usuarios.telefono || '-',
        email: orderDetails.usuarios.email,
      }
    : {
        nombre: '-',
        telefono: '-',
        email: '-',
      };

  const detallesProductos: DetalleProducto[] = orderDetails.detalles_pedido.map((item) => ({
    id_producto: item.id_producto,
    nombre_producto: item.productos?.nombre_producto || '-',
    cantidad: item.cantidad,
    precio_unitario: item.precio_al_momento,
  }));

  const subtotal = detallesProductos.reduce(
    (sum, item) => sum + item.precio_unitario * item.cantidad,
    0
  );

  const envio = 0.0; // Opcional: puedes calcular dinámicamente
  const estadoConfig = ESTADOS_CONFIG[orderDetails.estado_entrega];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 items-center justify-center bg-black/50 p-4" onPress={onClose}>
        <Pressable className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl" onPress={(e) => e.stopPropagation()}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="border-b border-gray-200 p-6">
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="text-2xl font-bold text-gray-800">
                    Pedido #{orderDetails.id_pedido}
                  </Text>
                  <View
                    className="mt-2 self-start rounded-full px-3 py-1"
                    style={{ backgroundColor: estadoConfig.bgColor }}>
                    <Text className="text-sm font-semibold" style={{ color: estadoConfig.color }}>
                      {estadoConfig.label}
                    </Text>
                  </View>
                </View>
                <Pressable onPress={onClose} className="rounded-full bg-gray-100 p-2">
                  <X size={24} color="#666" />
                </Pressable>
              </View>
              <View className="mt-4 flex-row items-center gap-2">
                <Calendar size={16} color="#666" />
                <Text className="text-sm text-gray-600">
                  Fecha: {new Date(orderDetails.fecha_pedido).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </View>
            </View>

            {/* Información del Cliente */}
            <View className="border-b border-gray-200 p-6">
              <Text className="mb-3 text-lg font-bold text-gray-800">Información del Cliente</Text>
              <View className="gap-3">
                <View className="flex-row items-center gap-2">
                  <User size={16} color="#666" />
                  <Text className="text-sm text-gray-700">{clienteInfo.nombre}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <MapPin size={16} color="#666" />
                  <Text className="flex-1 text-sm text-gray-700">{orderDetails.direccion_entrega}</Text>
                </View>
              </View>
            </View>

            {/* Productos */}
            <View className="border-b border-gray-200 p-6">
              <View className="mb-3 flex-row items-center gap-2">
                <ShoppingBag size={20} color="#0d4682" />
                <Text className="text-lg font-bold text-gray-800">Productos</Text>
              </View>
              <View className="gap-3">
                {detallesProductos.map((producto) => (
                  <View
                    key={producto.id_producto}
                    className="flex-row items-center justify-between rounded-lg bg-gray-50 p-3">
                    <View className="flex-1">
                      <Text className="font-semibold text-gray-800">{producto.nombre_producto}</Text>
                      <Text className="text-sm text-gray-600">
                        ${producto.precio_unitario.toFixed(2)} x {producto.cantidad}
                      </Text>
                    </View>
                    <Text className="text-base font-bold text-gray-800">
                      ${(producto.precio_unitario * producto.cantidad).toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Resumen de Pago */}
            <View className="p-6">
              <Text className="mb-3 text-lg font-bold text-gray-800">Resumen de Pago</Text>
              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-gray-600">Subtotal</Text>
                  <Text className="text-sm font-semibold text-gray-800">${subtotal.toFixed(2)}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-gray-600">Envío</Text>
                  <Text className="text-sm font-semibold text-gray-800">${envio.toFixed(2)}</Text>
                </View>
                <View className="mt-2 flex-row items-center justify-between border-t border-gray-200 pt-3">
                  <Text className="text-lg font-bold text-gray-800">Total</Text>
                  <Text className="text-2xl font-bold text-[#0d4682]">
                    ${(subtotal + envio).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Footer */}
            <View className="border-t border-gray-200 p-6">
              <Button onPress={onClose} className="w-full bg-[#17a2b8]">
                <Text className="font-semibold text-white">Cerrar</Text>
              </Button>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
