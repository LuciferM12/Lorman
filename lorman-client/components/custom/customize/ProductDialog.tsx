import * as React from 'react';
import {
  View,
  Modal,
  ScrollView,
  Pressable,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Upload, ImageIcon } from 'lucide-react-native';

type ProductFormData = {
  nombre_producto: string;
  descripcion: string;
  precio_unitario: string;
  stock: string;
  disponible: boolean;
  imagen?: string;
};

type InitialData = Partial<ProductFormData & { id_producto?: number; imagen?: string }>;

type AddProductDialogProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData & { imagen?: string; id_producto?: number }) => void;
  initialData?: InitialData;
};

export default function AddProductDialog({ visible, onClose, onSubmit, initialData }: AddProductDialogProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      nombre_producto: '',
      descripcion: '',
      precio_unitario: '',
      stock: '',
      disponible: true,
      imagen: undefined,
    },
  });

  const [productImage, setProductImage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      reset({
        nombre_producto: initialData?.nombre_producto ?? '',
        descripcion: initialData?.descripcion ?? '',
        precio_unitario: initialData?.precio_unitario ?? '',
        stock: initialData?.stock ?? '',
        disponible: initialData?.disponible ?? true,
        imagen: initialData?.imagen ?? undefined,
      });
      setProductImage(initialData?.imagen ?? null);
    }
  }, [visible, initialData, reset]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProductImage(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const handleFormSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...data,
        imagen: productImage || undefined,
        id_producto: initialData?.id_producto,
      });
      reset();
      setProductImage(null);
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setProductImage(null);
    onClose();
  };

  const isEditing = !!initialData?.id_producto;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable
        className="flex-1 items-center justify-center bg-black/50 p-4"
        onPress={handleClose}
      >
        <TouchableWithoutFeedback onPress={() => { /* evita cerrar el modal al tocar el contenido */ }}>
          <View className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 24 }}
            >
              <View className="border-b border-gray-200 p-6">
                <View className="flex-row items-center justify-between">
                  <Text className="text-2xl font-bold text-gray-800">
                    {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                  </Text>
                  <Pressable
                    onPress={handleClose}
                    className="rounded-full bg-gray-100 p-2"
                    accessibilityLabel="Cerrar diálogo"
                  >
                    <X size={22} color="#666" />
                  </Pressable>
                </View>
              </View>

              <View className="p-6 space-y-4">
                {/* Imagen */}
                <View>
                  <Label>Imagen del Producto</Label>
                  <View className="items-center mt-2">
                    <View className="h-36 w-36 overflow-hidden rounded-lg bg-gray-100 items-center justify-center mb-3">
                      {productImage ? (
                        <Image
                          source={{ uri: productImage }}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode="cover"
                        />
                      ) : (
                        <View className="items-center justify-center">
                          <ImageIcon size={32} color="#cbd5e1" />
                          <Text className="text-xs text-gray-500 mt-2">Sin imagen</Text>
                        </View>
                      )}
                    </View>

                    <Button onPress={pickImage} className="flex-row gap-2 bg-gray-600">
                      <Upload size={16} color="#fff" />
                      <Text className="text-sm font-semibold text-white">
                        {productImage ? 'Cambiar Imagen' : 'Subir Imagen'}
                      </Text>
                    </Button>
                  </View>
                </View>

                {/* Nombre */}
                <View>
                  <Label nativeID="nombre_producto">Nombre del Producto *</Label>
                  <Controller
                    control={control}
                    name="nombre_producto"
                    rules={{
                      required: 'El nombre es obligatorio',
                      minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="Ej: Garrafón de Agua"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        className="mt-2"
                      />
                    )}
                  />
                  {errors.nombre_producto && (
                    <Text className="text-sm text-destructive">{errors.nombre_producto.message}</Text>
                  )}
                </View>

                {/* Descripción */}
                <View>
                  <Label nativeID="descripcion">Descripción *</Label>
                  <Controller
                    control={control}
                    name="descripcion"
                    rules={{ required: 'La descripción es obligatoria' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="Ej: 20 Litros"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        multiline
                        numberOfLines={2}
                        style={{ height: 60, textAlignVertical: 'top' }}
                        className="mt-2"
                      />
                    )}
                  />
                  {errors.descripcion && (
                    <Text className="text-sm text-destructive">{errors.descripcion.message}</Text>
                  )}
                </View>

                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <Label nativeID="precio_unitario">Precio Unitario ($) *</Label>
                    <Controller
                      control={control}
                      name="precio_unitario"
                      rules={{
                        required: 'El precio es obligatorio',
                        pattern: {
                          value: /^\d+(\.\d{1,2})?$/,
                          message: 'Precio inválido',
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="80.00"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          keyboardType="decimal-pad"
                          className="mt-2"
                        />
                      )}
                    />
                    {errors.precio_unitario && (
                      <Text className="text-sm text-destructive">
                        {errors.precio_unitario.message}
                      </Text>
                    )}
                  </View>

                  <View className="flex-1">
                    <Label nativeID="stock">Stock Inicial *</Label>
                    <Controller
                      control={control}
                      name="stock"
                      rules={{
                        required: 'El stock es obligatorio',
                        pattern: {
                          value: /^\d+$/,
                          message: 'Solo números enteros',
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="150"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          keyboardType="number-pad"
                          className="mt-2"
                        />
                      )}
                    />
                    {errors.stock && (
                      <Text className="text-sm text-destructive">{errors.stock.message}</Text>
                    )}
                  </View>
                </View>

                <View>
                  <Label>Disponible</Label>
                  <Controller
                    control={control}
                    name="disponible"
                    render={({ field: { onChange, value } }) => (
                      <Pressable
                        onPress={() => onChange(!value)}
                        className="flex-row items-center gap-3 mt-2"
                        accessibilityRole="switch"
                        accessibilityState={{ checked: !!value }}
                      >
                        <View className={`h-6 w-11 rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'}`}>
                          <View
                            className={`h-5 w-5 rounded-full bg-white ${value ? 'translate-x-6' : 'translate-x-1'}`}
                            style={{ marginTop: 2 }}
                          />
                        </View>
                        <Text className="text-sm text-gray-700">
                          {value ? 'Producto activo' : 'Producto inactivo'}
                        </Text>
                      </Pressable>
                    )}
                  />
                </View>
              </View>

              <View className="flex-row gap-3 border-t border-gray-200 p-6 bg-white">
                <Button onPress={handleClose} className="flex-1 bg-gray-500">
                  <Text className="font-semibold text-white">Cancelar</Text>
                </Button>
                <Button
                  onPress={handleSubmit(handleFormSubmit)}
                  disabled={isSubmitting}
                  className="flex-1 bg-[#17a2b8]"
                >
                  <Text className="font-semibold text-white">
                    {isSubmitting ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
                  </Text>
                </Button>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
}