// components/admin/AdminSidebar.tsx
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Pressable } from 'react-native';
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  Palette,
} from 'lucide-react-native';

type MenuItem = {
  id: string;
  label: string;
  icon: any;
};

type AdminSidebarProps = {
  selectedSection: string;
  onSectionChange: (section: string) => void;
};

export default function AdminSidebar({ selectedSection, onSectionChange }: AdminSidebarProps) {
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'usuarios', label: 'Gestión de Usuarios', icon: Users },
    { id: 'productos', label: 'Gestión de Productos', icon: Package },
    { id: 'pedidos', label: 'Pedidos', icon: FileText },
    { id: 'personalizacion', label: 'Personalización', icon: Palette },
  ];

  return (
    <View className="w-64 bg-[#0d4682] p-6">
      {/* Logo */}
      <View className="mb-8 flex-row items-center gap-3">
        <View className="h-10 w-10 items-center justify-center rounded bg-white">
          <Text className="text-lg font-bold text-[#0d4682]">L</Text>
        </View>
        <Text className="text-xl font-bold text-white">Lorman</Text>
      </View>

      {/* Menu Items */}
      <View className="flex-1 gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedSection === item.id;

          return (
            <Pressable
              key={item.id}
              onPress={() => onSectionChange(item.id)}
              className={`flex-row items-center gap-3 rounded-lg p-3 ${
                isSelected ? 'bg-white/20' : ''
              }`}>
              <Icon size={20} color="#fff" />
              <Text className="text-sm text-white">{item.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* User Profile */}
      <View className="mt-auto border-t border-white/20 pt-4">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Text className="text-sm font-bold text-white">A</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-white">Administrador</Text>
            <Text className="text-xs text-white/70">Ver perfil</Text>
          </View>
        </View>
      </View>
    </View>
  );
}