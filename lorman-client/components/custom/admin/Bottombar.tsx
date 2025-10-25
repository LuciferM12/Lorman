import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Pressable } from 'react-native';
import { LayoutDashboard, Users, Package, FileText, Palette } from 'lucide-react-native';
import { Link, usePathname } from 'expo-router';

type MenuItem = {
  id: string;
  label: string;
  icon: any;
  route: string;
};

export const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: '/admin' },
  { id: 'usuarios', label: 'Usuarios', icon: Users, route: '/admin/usuarios' },
  { id: 'productos', label: 'Productos', icon: Package, route: '/admin/productos' },
  { id: 'pedidos', label: 'Pedidos', icon: FileText, route: '/admin/pedidos' },
  {
    id: 'personalizacion',
    label: 'Personalización',
    icon: Palette,
    route: '/admin/personalizacion',
  },
];

export default function AdminBottomBar() {
  const pathname = usePathname();

  return (
    <View className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-primaryDark md:hidden">
      <View className="pb-safe flex-row items-center justify-around px-2 py-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isSelected = pathname === item.route;

          return (
            <Link href={item.route as any} key={item.id} asChild>
              <Pressable
                className={`flex-1 items-center justify-center gap-1 rounded-lg py-2 ${
                  isSelected ? 'bg-white/20' : ''
                }`}>
                {/* Iconos de 24px para mejor visibilidad en mobile */}
                <Icon size={24} color="#fff" />
                <Text
                  className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-white/80'}`}
                  numberOfLines={1}>
                  {item.label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </View>
  );
}
