import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { View, ScrollView, Pressable, Alert } from 'react-native';
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react-native';

type Producto = {
  id_producto: number;
  nombre_producto: string;
  descripcion: string;
  precio_unitario: number;
  stock: number;
  disponible: boolean;
};

const ITEMS_PER_PAGE = 5;

export default function ProductosScreen() {
  const [productos, setProductos] = React.useState<Producto[]>([
    {
      id_producto: 1,
      nombre_producto: 'Garrafón de Agua Purificada',
      descripcion: '20 Litros',
      precio_unitario: 80.0,
      stock: 150,
      disponible: true,
    },
    {
      id_producto: 2,
      nombre_producto: 'Hielo Cristalino en Bolsa',
      descripcion: '5 kg',
      precio_unitario: 25.0,
      stock: 200,
      disponible: true,
    },
    {
      id_producto: 3,
      nombre_producto: 'Botella de Agua 1L',
      descripcion: '1 Litro - Pack de 12',
      precio_unitario: 45.0,
      stock: 0,
      disponible: false,
    },
    {
      id_producto: 4,
      nombre_producto: 'Botella de Agua 500ml',
      descripcion: '500ml - Pack de 24',
      precio_unitario: 60.0,
      stock: 80,
      disponible: true,
    },
    {
      id_producto: 5,
      nombre_producto: 'Garrafón Retornable',
      descripcion: '20 Litros - Envase retornable',
      precio_unitario: 50.0,
      stock: 100,
      disponible: true,
    },
    {
      id_producto: 6,
      nombre_producto: 'Hielo en Cubos Premium',
      descripcion: '10 kg - Bolsa grande',
      precio_unitario: 45.0,
      stock: 50,
      disponible: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleAddProduct = () => {
    console.log('Agregar nuevo producto');
  };

  const handleEditProduct = (id: number) => {
    console.log('Editar producto:', id);
  };

  const handleDeleteProduct = (id: number, nombre: string) => {
    Alert.alert('Eliminar Producto', `¿Estás seguro de eliminar "${nombre}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          setProductos(productos.filter((p) => p.id_producto !== id));
        },
      },
    ]);
  };

  const handleToggleDisponible = (id: number) => {
    setProductos(productos.map((p) => (p.id_producto === id ? { ...p, disponible: !p.disponible } : p)));
  };

  // Filtrar productos
  const filteredProductos = productos.filter((p) =>
    p.nombre_producto.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcular paginación
  const totalPages = Math.ceil(filteredProductos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProductos = filteredProductos.slice(startIndex, endIndex);

  // Reset page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-8">
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-800">Gestión de Productos</Text>
            <Text className="text-sm text-gray-600">
              {filteredProductos.length} productos en total
            </Text>
          </View>
          <Button onPress={handleAddProduct} className="flex-row gap-2 bg-[#17a2b8]">
            <Plus size={20} color="#fff" />
            <Text className="font-semibold text-white">Nuevo Producto</Text>
          </Button>
        </View>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <View className="flex-row items-center gap-2">
              <Search size={20} color="#666" />
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1"
              />
            </View>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardContent className="p-0">
            {/* Table Header */}
            <View className="flex-row border-b border-gray-200 bg-gray-50 px-6 py-4">
              <Text className="w-12 text-sm font-semibold text-gray-700">ID</Text>
              <Text className="flex-1 text-sm font-semibold text-gray-700">Nombre</Text>
              <Text className="w-48 text-sm font-semibold text-gray-700">Descripción</Text>
              <Text className="w-24 text-sm font-semibold text-gray-700">Precio</Text>
              <Text className="w-20 text-sm font-semibold text-gray-700">Stock</Text>
              <Text className="w-28 text-sm font-semibold text-gray-700">Disponible</Text>
              <Text className="w-32 text-sm font-semibold text-gray-700">Acciones</Text>
            </View>

            {/* Table Body */}
            {currentProductos.map((producto) => (
              <View
                key={producto.id_producto}
                className="flex-row items-center border-b border-gray-100 px-6 py-4">
                <Text className="w-12 text-sm text-gray-800">{producto.id_producto}</Text>
                <Text className="flex-1 text-sm font-medium text-gray-800">
                  {producto.nombre_producto}
                </Text>
                <Text className="w-48 text-sm text-gray-600">{producto.descripcion}</Text>
                <Text className="w-24 text-sm font-semibold text-gray-800">
                  ${producto.precio_unitario.toFixed(2)}
                </Text>
                <Text
                  className={`w-20 text-sm font-medium ${
                    producto.stock === 0 ? 'text-red-500' : 'text-gray-800'
                  }`}>
                  {producto.stock}
                </Text>
                <View className="w-28">
                  <Pressable
                    onPress={() => handleToggleDisponible(producto.id_producto)}
                    className={`rounded-full px-3 py-1 ${
                      producto.disponible ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                    <Text
                      className={`text-center text-xs font-semibold ${
                        producto.disponible ? 'text-green-700' : 'text-red-700'
                      }`}>
                      {producto.disponible ? 'Activo' : 'Inactivo'}
                    </Text>
                  </Pressable>
                </View>
                <View className="w-32 flex-row gap-2">
                  <Pressable
                    onPress={() => handleEditProduct(producto.id_producto)}
                    className="rounded bg-blue-100 p-2">
                    <Pencil size={16} color="#2563eb" />
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      handleDeleteProduct(producto.id_producto, producto.nombre_producto)
                    }
                    className="rounded bg-red-100 p-2">
                    <Trash2 size={16} color="#dc2626" />
                  </Pressable>
                </View>
              </View>
            ))}
          </CardContent>
        </Card>

        {filteredProductos.length === 0 && (
          <View className="py-8">
            <Text className="text-center text-gray-500">No se encontraron productos</Text>
          </View>
        )}

        {/* Pagination */}
        {filteredProductos.length > 0 && (
          <View className="mt-6 flex-row items-center justify-between">
            <Text className="text-sm text-gray-600">
              Mostrando {startIndex + 1} - {Math.min(endIndex, filteredProductos.length)} de{' '}
              {filteredProductos.length} productos
            </Text>

            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`flex-row items-center gap-1 rounded-lg px-3 py-2 ${
                  currentPage === 1 ? 'bg-gray-100' : 'bg-white border border-gray-300'
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
                      currentPage === page ? 'bg-[#17a2b8]' : 'bg-white border border-gray-300'
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
                  currentPage === totalPages ? 'bg-gray-100' : 'bg-white border border-gray-300'
                }`}>
                <Text
                  className={`text-sm ${
                    currentPage === totalPages ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                  Siguiente
                </Text>
                <ChevronRight
                  size={16}
                  color={currentPage === totalPages ? '#ccc' : '#666'}
                />
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}