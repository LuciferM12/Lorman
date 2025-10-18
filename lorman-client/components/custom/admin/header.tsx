// components/admin/AdminHeader.tsx
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Pressable } from 'react-native';
import { Bell, LogOut } from 'lucide-react-native';

type AdminHeaderProps = {
  onLogout: () => void;
};

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  const [notificationCount] = React.useState(3);

  return (
    <View className="flex-row items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
      <Text className="text-2xl font-bold text-[#0d4682]">Panel de Administración</Text>

      <View className="flex-row items-center gap-4">
        {/* Notificaciones */}
        <Pressable className="relative">
          <Bell size={24} color="#0d4682" />
          {notificationCount > 0 && (
            <View className="absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-full bg-red-500">
              <Text className="text-[10px] font-bold text-white">{notificationCount}</Text>
            </View>
          )}
        </Pressable>

        {/* Cerrar Sesión */}
        <Pressable
          onPress={onLogout}
          className="flex-row items-center gap-2 rounded-lg border border-red-500 px-4 py-2">
          <LogOut size={18} color="#ef4444" />
          <Text className="text-sm font-semibold text-red-500">Cerrar Sesión</Text>
        </Pressable>
      </View>
    </View>
  );
}