import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { View, ScrollView, Pressable, Alert } from 'react-native';
import { Plus, Pencil, Trash2, Search, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react-native';
import AddUserDialog from '@/components/custom/customize/UserDialog';

type Usuario = {
  id_usuario: number;
  nombre_completo: string;
  email: string;
  password_hash: string;
  direccion: string;
  telefono: string;
  dias_entrega_preferidos: string;
  fecha_registro: string;
  rol: string;
};

const ITEMS_PER_PAGE = 4;

export default function UsuariosScreen() {
  const [usuarios, setUsuarios] = React.useState<Usuario[]>([
    {
      id_usuario: 1,
      nombre_completo: 'Juan Pérez García',
      email: 'juan.perez@email.com',
      password_hash: '***',
      direccion: 'Av. Carranza 1234, Centro, SLP',
      telefono: '4441234567',
      dias_entrega_preferidos: 'Lunes, Miércoles',
      fecha_registro: '2024-01-15',
      rol: 'cliente',
    },
    {
      id_usuario: 2,
      nombre_completo: 'María González López',
      email: 'maria.gonzalez@email.com',
      password_hash: '***',
      direccion: 'Calle Hidalgo 567, Lomas, SLP',
      telefono: '4449876543',
      dias_entrega_preferidos: 'Martes, Jueves',
      fecha_registro: '2024-02-20',
      rol: 'cliente',
    },
    {
      id_usuario: 3,
      nombre_completo: 'Admin Lorman',
      email: 'admin@lorman.com',
      password_hash: '***',
      direccion: 'Oficina Central',
      telefono: '4445550000',
      dias_entrega_preferidos: '',
      fecha_registro: '2023-01-01',
      rol: 'admin',
    },
    {
      id_usuario: 4,
      nombre_completo: 'Carlos Ramírez',
      email: 'carlos.ramirez@email.com',
      password_hash: '***',
      direccion: 'Col. Moderna 890, SLP',
      telefono: '4442223333',
      dias_entrega_preferidos: 'Viernes',
      fecha_registro: '2024-03-10',
      rol: 'cliente',
    },
    {
      id_usuario: 5,
      nombre_completo: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      password_hash: '***',
      direccion: 'Av. Universidad 456, SLP',
      telefono: '4447778888',
      dias_entrega_preferidos: 'Lunes, Viernes',
      fecha_registro: '2024-04-05',
      rol: 'cliente',
    },
  ]);

  const [showAddUser, setShowAddUser] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<Usuario | null>(null);

  const handleAddUser = () => {
    // abrir diálogo para crear nuevo usuario
    setEditingUser(null);
    setShowAddUser(true);
  };

  const handleEditUser = (usuario: Usuario) => {
    // abrir diálogo con datos cargados
    setEditingUser(usuario);
    setShowAddUser(true);
  };

  const handleDeleteUser = (id: number, nombre: string) => {
    Alert.alert('Eliminar Usuario', `¿Estás seguro de eliminar a "${nombre}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          setUsuarios(usuarios.filter((u) => u.id_usuario !== id));
        },
      },
    ]);
  };

  // Este es el handler que recibe los datos del dialog (nuevo o edición)
  const handleDialogSubmit = (data: any) => {
    if (editingUser) {
      // actualizar usuario existente
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id_usuario === editingUser.id_usuario
            ? {
                ...u,
                nombre_completo: data.nombre,
                email: data.email,
                direccion: data.direccion,
                telefono: data.telefono,
                rol: data.rol,
              }
            : u
        )
      );
    } else {
      // crear nuevo usuario
      const newId = Math.max(0, ...usuarios.map((u) => u.id_usuario)) + 1;
      const newUser: Usuario = {
        id_usuario: newId,
        nombre_completo: data.nombre,
        email: data.email,
        password_hash: data.password ? '***' : '***',
        direccion: data.direccion,
        telefono: data.telefono,
        dias_entrega_preferidos: '',
        fecha_registro: new Date().toISOString(),
        rol: data.rol,
      };
      setUsuarios((prev) => [newUser, ...prev]);
    }

    // cerrar dialog y limpiar edición
    setShowAddUser(false);
    setEditingUser(null);
  };

  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);

  // Filtrar usuarios
  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nombre_completo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcular paginación
  const totalPages = Math.ceil(filteredUsuarios.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsuarios = filteredUsuarios.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-8">
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-800">Gestión de Usuarios</Text>
            <Text className="text-sm text-gray-600">{filteredUsuarios.length} usuarios registrados</Text>
          </View>
          <Button onPress={handleAddUser} className="flex-row gap-2 bg-[#17a2b8]">
            <Plus size={20} color="#fff" />
            <Text className="font-semibold text-white">Nuevo Usuario</Text>
          </Button>
        </View>

        <Card className="mb-6">
          <CardContent className="p-4">
            <View className="flex-row items-center gap-2">
              <Search size={20} color="#666" />
              <Input placeholder="Buscar por nombre o email..." value={searchQuery} onChangeText={setSearchQuery} className="flex-1" />
            </View>
          </CardContent>
        </Card>

        <View className="gap-4">
          {currentUsuarios.map((usuario) => (
            <Card key={usuario.id_usuario}>
              <CardContent className="p-6">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 gap-3">
                    <View className="flex-row items-center gap-2">
                      <View className={`h-10 w-10 items-center justify-center rounded-full ${usuario.rol === 'admin' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                        <Text className="text-lg font-bold text-white">{usuario.nombre_completo.charAt(0)}</Text>
                      </View>
                      <View>
                        <Text className="text-lg font-bold text-gray-800">{usuario.nombre_completo}</Text>
                        <View className={`rounded-full px-2 py-1 ${usuario.rol === 'admin' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                          <Text className={`text-xs font-semibold ${usuario.rol === 'admin' ? 'text-purple-700' : 'text-blue-700'}`}>{usuario.rol.toUpperCase()}</Text>
                        </View>
                      </View>
                    </View>

                    <View className="gap-2">
                      <View className="flex-row items-center gap-2">
                        <Mail size={16} color="#666" />
                        <Text className="text-sm text-gray-600">{usuario.email}</Text>
                      </View>

                      <View className="flex-row items-center gap-2">
                        <Phone size={16} color="#666" />
                        <Text className="text-sm text-gray-600">{usuario.telefono}</Text>
                      </View>

                      <View className="flex-row items-center gap-2">
                        <MapPin size={16} color="#666" />
                        <Text className="text-sm text-gray-600">{usuario.direccion}</Text>
                      </View>

                      {usuario.dias_entrega_preferidos && (
                        <View className="mt-2">
                          <Text className="text-xs font-semibold text-gray-700">Días preferidos:</Text>
                          <Text className="text-sm text-gray-600">{usuario.dias_entrega_preferidos}</Text>
                        </View>
                      )}

                      <Text className="mt-2 text-xs text-gray-500">Registrado: {new Date(usuario.fecha_registro).toLocaleDateString('es-MX')}</Text>
                    </View>
                  </View>

                  <View className="flex-row gap-2">
                    <Pressable onPress={() => handleEditUser(usuario)} className="rounded bg-blue-100 p-2">
                      <Pencil size={18} color="#2563eb" />
                    </Pressable>
                    <Pressable onPress={() => handleDeleteUser(usuario.id_usuario, usuario.nombre_completo)} className="rounded bg-red-100 p-2">
                      <Trash2 size={18} color="#dc2626" />
                    </Pressable>
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>

        {filteredUsuarios.length === 0 && (
          <View className="py-8">
            <Text className="text-center text-gray-500">No se encontraron usuarios</Text>
          </View>
        )}

        {filteredUsuarios.length > 0 && (
          <View className="mt-6 flex-row items-center justify-between">
            <Text className="text-sm text-gray-600">Mostrando {startIndex + 1} - {Math.min(endIndex, filteredUsuarios.length)} de {filteredUsuarios.length} usuarios</Text>

            <View className="flex-row items-center gap-2">
              <Pressable onPress={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className={`flex-row items-center gap-1 rounded-lg px-3 py-2 ${currentPage === 1 ? 'bg-gray-100' : 'bg-white border border-gray-300'}`}>
                <ChevronLeft size={16} color={currentPage === 1 ? '#ccc' : '#666'} />
                <Text className={`text-sm ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700'}`}>Anterior</Text>
              </Pressable>

              <View className="flex-row gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Pressable key={page} onPress={() => setCurrentPage(page)} className={`h-10 w-10 items-center justify-center rounded-lg ${currentPage === page ? 'bg-[#17a2b8]' : 'bg-white border border-gray-300'}`}>
                    <Text className={`text-sm font-semibold ${currentPage === page ? 'text-white' : 'text-gray-700'}`}>{page}</Text>
                  </Pressable>
                ))}
              </View>

              <Pressable onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`flex-row items-center gap-1 rounded-lg px-3 py-2 ${currentPage === totalPages ? 'bg-gray-100' : 'bg-white border border-gray-300'}`}>
                <Text className={`text-sm ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700'}`}>Siguiente</Text>
                <ChevronRight size={16} color={currentPage === totalPages ? '#ccc' : '#666'} />
              </Pressable>
            </View>
          </View>
        )}
      </View>

      <AddUserDialog
        visible={showAddUser}
        onClose={() => { setShowAddUser(false); setEditingUser(null); }}
        onSubmit={handleDialogSubmit}
        initialData={
          editingUser
            ? {
                id_usuario: editingUser.id_usuario,
                nombre: editingUser.nombre_completo,
                email: editingUser.email,
                telefono: editingUser.telefono,
                direccion: editingUser.direccion,
                rol: editingUser.rol as 'admin' | 'cliente',
                activo: true,
              }
            : undefined
        }
      />
    </ScrollView>
  );
}