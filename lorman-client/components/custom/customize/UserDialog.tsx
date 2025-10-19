import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { View, Modal, ScrollView, Pressable, Image, Alert } from 'react-native';
import { X, Upload, UserIcon } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

type UserFormData = {
  nombre: string;
  email: string;
  password: string;
  telefono: string;
  direccion: string;
  rol: 'admin' | 'cliente';
  activo: boolean;
};

type InitialData = Partial<UserFormData & { id_usuario?: number; foto_perfil?: string }>;

type AddUserDialogProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData & { foto_perfil?: string; id_usuario?: number }) => void;
  initialData?: InitialData;
};

export default function AddUserDialog({ visible, onClose, onSubmit, initialData }: AddUserDialogProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    defaultValues: {
      nombre: '',
      email: '',
      password: '',
      telefono: '',
      direccion: '',
      rol: 'cliente',
      activo: true,
    },
  });

  const [userPhoto, setUserPhoto] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<'admin' | 'cliente'>(() => initialData?.rol ?? 'cliente');

  // Reset form when dialog opens or when initialData changes (for edit)
  React.useEffect(() => {
    if (visible) {
      reset({
        nombre: initialData?.nombre ?? '',
        email: initialData?.email ?? '',
        password: '', // don't prefill password
        telefono: initialData?.telefono ?? '',
        direccion: initialData?.direccion ?? '',
        rol: initialData?.rol ?? 'cliente',
        activo: initialData?.activo ?? true,
      });
      setSelectedRole(initialData?.rol ?? 'cliente');
      setUserPhoto(initialData?.foto_perfil ?? null);
    }
  }, [visible, initialData, reset]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setUserPhoto(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const handleFormSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);

    try {
      onSubmit({
        ...data,
        rol: selectedRole,
        foto_perfil: userPhoto || undefined,
        id_usuario: initialData?.id_usuario,
      });

      reset();
      setUserPhoto(null);
      setSelectedRole('cliente');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar el usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setUserPhoto(null);
    setSelectedRole('cliente');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable className="flex-1 items-center justify-center bg-black/50 p-4" onPress={handleClose}>
        <Pressable className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl" onPress={(e) => e.stopPropagation()}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="border-b border-gray-200 p-6">
              <View className="flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-gray-800">
                  {initialData?.id_usuario ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
                </Text>
                <Pressable onPress={handleClose} className="rounded-full bg-gray-100 p-2">
                  <X size={24} color="#666" />
                </Pressable>
              </View>
            </View>

            <View className="p-6">
              <View className="gap-4">
                {/* Nombre */}
                <View className="gap-2">
                  <Label nativeID="nombre">Nombre Completo *</Label>
                  <Controller
                    control={control}
                    name="nombre"
                    rules={{
                      required: 'El nombre es obligatorio',
                      minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input placeholder="Ej: Juan Pérez García" value={value} onChangeText={onChange} onBlur={onBlur} accessibilityLabel="nombre" />
                    )}
                  />
                  {errors.nombre && <Text className="text-sm text-destructive">{errors.nombre.message}</Text>}
                </View>

                {/* Email */}
                <View className="gap-2">
                  <Label nativeID="email">Correo Electrónico *</Label>
                  <Controller
                    control={control}
                    name="email"
                    rules={{
                      required: 'El correo es obligatorio',
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Correo electrónico inválido' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input placeholder="ejemplo@correo.com" value={value} onChangeText={onChange} onBlur={onBlur} keyboardType="email-address" autoCapitalize="none" accessibilityLabel="email" />
                    )}
                  />
                  {errors.email && <Text className="text-sm text-destructive">{errors.email.message}</Text>}
                </View>

                {/* Contraseña */}
                <View className="gap-2">
                  <Label nativeID="password">Contraseña {initialData?.id_usuario ? '(dejar vacío para no cambiar)' : '*'}</Label>
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: initialData?.id_usuario ? false : 'La contraseña es obligatoria',
                      minLength: initialData?.id_usuario ? undefined : { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input placeholder="Mínimo 6 caracteres" value={value} onChangeText={onChange} onBlur={onBlur} secureTextEntry accessibilityLabel="password" />
                    )}
                  />
                  {errors.password && <Text className="text-sm text-destructive">{errors.password.message}</Text>}
                </View>

                {/* Teléfono */}
                <View className="gap-2">
                  <Label nativeID="telefono">Teléfono *</Label>
                  <Controller
                    control={control}
                    name="telefono"
                    rules={{
                      required: 'El teléfono es obligatorio',
                      pattern: { value: /^[0-9]{10}$/, message: 'Debe ser un número de 10 dígitos' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input placeholder="4441234567" value={value} onChangeText={onChange} onBlur={onBlur} keyboardType="phone-pad" maxLength={10} accessibilityLabel="telefono" />
                    )}
                  />
                  {errors.telefono && <Text className="text-sm text-destructive">{errors.telefono.message}</Text>}
                </View>

                {/* Dirección */}
                <View className="gap-2">
                  <Label nativeID="direccion">Dirección *</Label>
                  <Controller
                    control={control}
                    name="direccion"
                    rules={{ required: 'La dirección es obligatoria' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input placeholder="Calle, número, colonia, ciudad" value={value} onChangeText={onChange} onBlur={onBlur} multiline numberOfLines={2} style={{ height: 60, textAlignVertical: 'top' }} accessibilityLabel="direccion" />
                    )}
                  />
                  {errors.direccion && <Text className="text-sm text-destructive">{errors.direccion.message}</Text>}
                </View>

                {/* Rol */}
                <View className="gap-2">
                  <Label>Rol del Usuario *</Label>
                  <View className="flex-row gap-3">
                    <Pressable onPress={() => setSelectedRole('cliente')} className={`flex-1 rounded-lg border-2 p-4 ${selectedRole === 'cliente' ? 'border-[#17a2b8] bg-[#17a2b8]/10' : 'border-gray-300 bg-white'}`} >
                      <Text className={`text-center font-semibold ${selectedRole === 'cliente' ? 'text-[#17a2b8]' : 'text-gray-700'}`}>Cliente</Text>
                    </Pressable>
                    <Pressable onPress={() => setSelectedRole('admin')} className={`flex-1 rounded-lg border-2 p-4 ${selectedRole === 'admin' ? 'border-[#17a2b8] bg-[#17a2b8]/10' : 'border-gray-300 bg-white'}`} >
                      <Text className={`text-center font-semibold ${selectedRole === 'admin' ? 'text-[#17a2b8]' : 'text-gray-700'}`}>Administrador</Text>
                    </Pressable>
                  </View>
                </View>

                {/* Activo */}
                <View className="gap-2">
                  <Label>Estado del Usuario</Label>
                  <Controller
                    control={control}
                    name="activo"
                    render={({ field: { onChange, value } }) => (
                      <Pressable onPress={() => onChange(!value)} className="flex-row items-center gap-3">
                        <View className={`h-6 w-11 rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'}`}>
                          <View className={`h-5 w-5 rounded-full bg-white shadow-md ${value ? 'translate-x-6' : 'translate-x-1'}`} style={{ marginTop: 2 }} />
                        </View>
                        <Text className="text-sm text-gray-700">{value ? 'Usuario activo' : 'Usuario inactivo'}</Text>
                      </Pressable>
                    )}
                  />
                </View>
              </View>
            </View>

            <View className="flex-row gap-3 border-t border-gray-200 p-6">
              <Button onPress={handleClose} className="flex-1 bg-gray-500">
                <Text className="font-semibold text-white">Cancelar</Text>
              </Button>
              <Button onPress={handleSubmit(handleFormSubmit)} disabled={isSubmitting} className="flex-1 bg-[#17a2b8]">
                <Text className="font-semibold text-white">{isSubmitting ? 'Guardando...' : initialData?.id_usuario ? 'Guardar cambios' : 'Agregar Usuario'}</Text>
              </Button>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}