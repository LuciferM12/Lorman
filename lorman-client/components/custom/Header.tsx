import React, { memo } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { Button } from '../ui/button';
import { COLORS } from '@/constants/colors';
import { Link, useRouter, usePathname } from 'expo-router';

// ✅ Importar el asset de forma estática (más rápido que require)
// @ts-ignore: module declaration for PNG assets is not present in this project
import LOGO_IMAGE from '@/assets/images/lorman-logo.png';

const NAV_ITEMS = [
  { id: 1, title: 'Inicio', route: '/' },
  { id: 2, title: 'Productos', route: '/productos' },
  { id: 3, title: 'Nosotros', route: '/nosotros' },
  { id: 4, title: 'Contacto', route: '/contacto' },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Detectar ruta actual para resaltar enlace activo

  return (
    <View className="absolute left-0 right-0 top-0 z-50 h-20 items-center justify-center bg-white shadow-sm">
      <View className="flex w-full max-w-[1920px] flex-row items-center justify-between px-6">
        {/* ✅ Link usando asChild evita Pressable doble */}
        <Link href="/" asChild>
          <Pressable className="flex-row items-center gap-1 active:opacity-80">
            <Image
              source={LOGO_IMAGE}
              style={{ width: 70, height: 70, resizeMode: 'contain' }}
            />
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
                    }`}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </View>

        {/* ✅ Botón simple sin inline style */}
        <Button
          onPress={() => router.push('/login')}
          className="bg-[#1e56a0] px-4 py-2 rounded-lg"
        >
          <Text className="text-lg font-bold text-white">Log In</Text>
        </Button>
      </View>
    </View>
  );
};

// ✅ memo mantiene el componente estable si no cambian rutas
export default memo(Header);
