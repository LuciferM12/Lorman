import * as React from 'react';
import { View, ScrollView, Pressable, Alert, Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react-native';
import AddProductDialog from '@/components/custom/customize/ProductDialog';
import { createProduct, getProducts, updateProduct } from '@/api/products';

type Producto = {
  id_producto: number;
  nombre_producto: string;
  descripcion: string;
  precio_unitario: number;
  stock: number;
  disponible: boolean;
  imagen?: string | undefined;
};

type ProductFormData = {
  nombre_producto: string;
  descripcion: string;
  precio_unitario: string;
  stock: string;
  disponible: boolean;
  imagen?: string;
};

const ITEMS_PER_PAGE = 5;

export default function ProductosScreen() {
  const [productos, setProductos] = React.useState<Producto[]>([]);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Producto | null>(null);

  const fetchProducts = async () => {
    try {
      const response: Producto[] = await getProducts();
      setProductos(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setDialogVisible(true);
  };

  const handleEditProduct = (id: number) => {
    const producto = productos.find((p) => p.id_producto === id);
    if (producto) {
      setEditingProduct(producto);
      setDialogVisible(true);
    }
  };

  const handleDeleteProduct = (id: number, nombre: string) => {
    Alert.alert('Eliminar Producto', `¿Estás seguro de eliminar "${nombre}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => setProductos((prev) => prev.filter((p) => p.id_producto !== id)),
      },
    ]);
  };

  const handleToggleDisponible = (id: number) => {
    setProductos((prev) =>
      prev.map((p) => (p.id_producto === id ? { ...p, disponible: !p.disponible } : p))
    );
  };

  const handleSubmitProduct = async (data: ProductFormData & { id_producto?: number }) => {
    const productoAGuardar: Producto = {
      id_producto: data.id_producto || Date.now(),
      nombre_producto: data.nombre_producto,
      descripcion: data.descripcion,
      precio_unitario: parseFloat(data.precio_unitario) || 0,
      stock: parseInt(data.stock || '0', 10) || 0,
      disponible: !!data.disponible,
      imagen: data.imagen,
    };

    try {
      if (data.id_producto) {
        await updateProduct(data.id_producto, productoAGuardar);
      } else {
        await createProduct(productoAGuardar);
      }
      const response: Producto[] = await getProducts();
      setProductos(response);
    } catch (error) {
      console.error('Error updating product:', error);
    }

    setDialogVisible(false);
    setEditingProduct(null);
  };

  // Filtering & pagination
  const filteredProductos = productos.filter((p) =>
    p.nombre_producto.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filteredProductos.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProductos = filteredProductos.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const initialProductData = editingProduct
    ? {
        id_producto: editingProduct.id_producto,
        nombre_producto: editingProduct.nombre_producto,
        descripcion: editingProduct.descripcion,
        precio_unitario: editingProduct.precio_unitario.toFixed(2),
        stock: editingProduct.stock.toString(),
        disponible: editingProduct.disponible,
        imagen: editingProduct.imagen,
      }
    : undefined;

  return (
    <>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6">
          {/* Header */}
          <View className="mb-6 flex-col items-center gap-4 lg:flex-row lg:justify-between">
            <View className="gap-2 max-sm:flex max-sm:items-center">
              <Text className="text-2xl font-bold text-gray-800">Gestión de Productos</Text>
              <Text className="text-sm text-gray-600">{filteredProductos.length} productos</Text>
            </View>

            <Button onPress={handleAddProduct} className="flex-row gap-2 bg-[#17a2b8]">
              <Plus size={18} color="#fff" />
              <Text className="font-semibold text-white">Nuevo Producto</Text>
            </Button>
          </View>

          {/* Search */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <View className="flex-row items-center gap-3">
                <Search size={18} color="#666" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1"
                />
              </View>
            </CardContent>
          </Card>

          {/* Product list (cards) */}
          <View className="space-y-4">
            {currentProductos.map((producto) => (
              <Card key={producto.id_producto}>
                <CardContent className="p-4">
                  <View className="flex-row items-center gap-4">
                    <View className="h-20 w-20 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                      {producto.imagen ? (
                        <Image
                          source={{ uri: producto.imagen }}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Text className="text-sm text-gray-500">Sin imagen</Text>
                      )}
                    </View>

                    <View className="flex-1">
                      <Text className="text-lg font-bold text-gray-800">
                        {producto.nombre_producto}
                      </Text>
                      <Text className="my-1 text-sm text-gray-600">{producto.descripcion}</Text>

                      <View className="flex-row items-center gap-3">
                        <Text className="text-sm font-semibold text-gray-800">
                          ${producto.precio_unitario.toFixed(2)}
                        </Text>
                        <Text
                          className={`text-sm ${producto.stock === 0 ? 'text-red-500' : 'text-gray-600'}`}>
                          Stock: {producto.stock}
                        </Text>
                        <Pressable
                          onPress={() => handleToggleDisponible(producto.id_producto)}
                          className={`rounded px-2 py-1 ${producto.disponible ? 'bg-green-100' : 'bg-red-100'}`}>
                          <Text
                            className={`text-xs font-semibold ${producto.disponible ? 'text-green-700' : 'text-red-700'}`}>
                            {producto.disponible ? 'Activo' : 'Inactivo'}
                          </Text>
                        </Pressable>
                      </View>
                    </View>

                    <View className="flex-col items-end gap-2">
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
                </CardContent>
              </Card>
            ))}
          </View>

          {/* Empty state */}
          {filteredProductos.length === 0 && (
            <View className="py-8">
              <Text className="text-center text-gray-500">No se encontraron productos</Text>
            </View>
          )}

          {/* Pagination */}
          {filteredProductos.length > 0 && (
            <View className="mt-6 flex-row items-center justify-between flex-wrap gap-2 max-sm:justify-center">
              <Text className="text-sm text-gray-600 max-sm:w-full max-sm:text-center">
                Mostrando {startIndex + 1} - {Math.min(endIndex, filteredProductos.length)} de{' '}
                {filteredProductos.length}
              </Text>

              <View className="flex-row items-center gap-2">
                <Pressable
                  onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`flex-row items-center gap-2 rounded-lg px-3 py-2 ${currentPage === 1 ? 'bg-gray-100' : 'border border-gray-300 bg-white'}`}>
                  <ChevronLeft size={16} color={currentPage === 1 ? '#ccc' : '#666'} />
                  <Text
                    className={`text-sm ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700'}`}>
                    Anterior
                  </Text>
                </Pressable>

                <View className="flex-row gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Pressable
                      key={page}
                      onPress={() => setCurrentPage(page)}
                      className={`h-10 w-10 items-center justify-center rounded-lg ${currentPage === page ? 'bg-[#17a2b8]' : 'border border-gray-300 bg-white'}`}>
                      <Text
                        className={`text-sm font-semibold ${currentPage === page ? 'text-white' : 'text-gray-700'}`}>
                        {page}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Pressable
                  onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`flex-row items-center gap-2 rounded-lg px-3 py-2 ${currentPage === totalPages ? 'bg-gray-100' : 'border border-gray-300 bg-white'}`}>
                  <Text
                    className={`text-sm ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700'}`}>
                    Siguiente
                  </Text>
                  <ChevronRight size={16} color={currentPage === totalPages ? '#ccc' : '#666'} />
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <AddProductDialog
        visible={dialogVisible}
        onClose={() => {
          setDialogVisible(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmitProduct}
        initialData={initialProductData}
      />
    </>
  );
}
