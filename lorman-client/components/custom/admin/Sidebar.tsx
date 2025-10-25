import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Pressable } from 'react-native';
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  Palette,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native';
import { Link, usePathname } from 'expo-router';

type MenuItem = {
  id: string;
  label: string;
  icon: any;
  route: string;
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: '/admin' },
    { id: 'usuarios', label: 'Gestión de Usuarios', icon: Users, route: '/admin/usuarios' },
    { id: 'productos', label: 'Gestión de Productos', icon: Package, route: '/admin/productos' },
    { id: 'pedidos', label: 'Pedidos', icon: FileText, route: '/admin/pedidos' },
    { id: 'personalizacion', label: 'Personalización', icon: Palette, route: '/admin/personalizacion' },
  ];

  return (
    <View className={`${isCollapsed ? 'w-20 p-3' : 'w-64 p-6'} bg-[#0d4682] transition-all duration-300`}>
      {/* Logo */}
      <View className="mb-8 flex-row items-center justify-center gap-3">
        <View className="h-10 w-10 items-center justify-center rounded bg-white">
          <Text className="text-lg font-bold text-[#0d4682]">L</Text>
        </View>
        
        {!isCollapsed && (
          <Text className="text-xl font-bold text-white">Lorman</Text>
        )}
      </View>

      <Pressable
        onPress={() => setIsCollapsed(!isCollapsed)}
        className="mb-4 flex-row items-center justify-center rounded-lg"
      >
        {isCollapsed ? (
          <ChevronRight size={20} color="#fff" />
        ) : (
          <ChevronLeft size={20} color="#fff" />
        )}
      </Pressable>

      {/* Menu Items */}
      <View className="flex-1 gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isSelected = pathname === item.route;

          return (
            <Link href={item.route as any} key={item.id} asChild>
              <Pressable
                className={`flex-row items-center rounded-lg ${
                  isSelected ? 'bg-white/20' : ''
                } ${isCollapsed ? 'justify-center p-3' : 'gap-3 p-3'}`}
              >
                {/* Iconos más grandes cuando está colapsado (28px vs 20px) */}
                <Icon size={isCollapsed ? 28 : 20} color="#fff" />
                {/* Ocultar etiquetas de texto cuando está colapsado */}
                {!isCollapsed && (
                  <Text
                    className={`text-lg font-semibold ${
                      isSelected ? 'text-white' : 'text-white/90'
                    }`}
                  >
                    {item.label}
                  </Text>
                )}
              </Pressable>
            </Link>
          );
        })}
      </View>

      {/* User Profile */}
      <View className="mt-auto border-t border-white/20 pt-4">
        <View className={`flex-row items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <View className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Text className="text-sm font-bold text-white">A</Text>
          </View>
          {!isCollapsed && (
            <View className="flex-1">
              <Text className="text-sm font-semibold text-white">Administrador</Text>
              <Text className="text-xs text-white/70">Ver perfil</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}