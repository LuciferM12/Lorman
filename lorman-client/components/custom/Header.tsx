import React, { memo } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { Button } from '../ui/button';
import { Link, useRouter, usePathname } from 'expo-router';

import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  { id: 1, title: 'Inicio', route: '/' },
  { id: 2, title: 'Productos', route: '/productos' },
  { id: 3, title: 'Nosotros', route: '/nosotros' },
  { id: 4, title: 'Contacto', route: '/contacto' },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Detectar ruta actual para resaltar enlace activo
  const { isAuthenticated, logoutAuth } = useAuth();

  return (
    <View className="absolute left-0 right-0 top-0 z-50 h-20 items-center justify-center bg-white shadow-sm">
      <View className="flex w-full max-w-[1920px] flex-row items-center justify-between px-6">
        {/* ✅ Link usando asChild evita Pressable doble */}
        <Link href="/" asChild>
          <Pressable className="flex-row items-center gap-1 active:opacity-80">
            <Image source={{uri: 'https://res.cloudinary.com/dhvb4jesa/image/upload/lorman-logo_qm40ot.png'}} style={{ width: 70, height: 70, resizeMode: 'contain' }} />
            <Text className="text-3xl font-semibold text-blue-900">Lorman</Text>
          </Pressable>
        </Link>

        {/* ✅ Mapa de navegación */}
        <View className="hidden md:flex md:flex-row md:items-center md:gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.route;
            return (
              <Link href={item.route as any} asChild key={item.id}>
                <Pressable className="active:opacity-60">
                  <Text
                    className={`text-lg font-semibold transition-colors ${
                      isActive ? 'text-blue-700' : 'text-zinc-600 hover:text-blue-700'
                    }`}>
                    {item.title}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </View>

        {/* ✅ Botón simple sin inline style */}
        <Button onPress={isAuthenticated ? logoutAuth : () => router.push('/login')} className="rounded-lg bg-[#1e56a0] px-4 py-2">
          <Text className="text-lg font-bold text-white">
            {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default memo(Header);
