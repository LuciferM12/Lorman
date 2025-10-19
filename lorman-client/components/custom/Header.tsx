import React, { memo } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { Button } from '../ui/button';
import { Link, useRouter, usePathname } from 'expo-router';
// ✅ Importar el asset de forma estática (más rápido que require)
// @ts-ignore: module declaration for PNG assets is not present in this project
import LOGO_IMAGE from '@/assets/images/lorman-logo.png';
import { useAuth } from '@/context/AuthContext';
// NUEVO: Importa un ícono para el carrito.
// (Asegúrate de tener 'lucide-react-native' instalado: npx expo install lucide-react-native)
import { ShoppingCart } from 'lucide-react-native';

const NAV_ITEMS = [
  { id: 1, title: 'Inicio', route: '/' },
  { id: 2, title: 'Productos', route: '/productos' },
  { id: 3, title: 'Nosotros', route: '/nosotros' },
  { id: 4, title: 'Contacto', route: '/contacto' },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Detectar ruta actual para resaltar enlace activo
  const { isAuthenticated, logoutAuth } = useAuth(); // ✅ 'logoutAuth' se sigue usando

  return (
    <View className="absolute left-0 right-0 top-0 z-50 h-20 items-center justify-center bg-white shadow-sm">
      <View className="flex w-full max-w-[1920px] flex-row items-center justify-between px-6">
        {/* ✅ Link usando asChild evita Pressable doble */}
        <Link href="/" asChild>
          <Pressable className="flex-row items-center gap-1 active:opacity-80">
            <Image source={LOGO_IMAGE} style={{ width: 70, height: 70, resizeMode: 'contain' }} />
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

        {/* --- INICIO DE SECCIÓN MODIFICADA --- */}
        {/* ✅ Botones condicionales de autenticación */}
        {isAuthenticated ? (
          // --- Si el usuario ESTÁ autenticado ---
          <View className="flex-row items-center gap-4">
            {/* 1. Botón de Carrito */}
            <Pressable onPress={() => router.push('/carrito')} className="active:opacity-70">
              <ShoppingCart color="#172554" size={28} />
            </Pressable>

            {/* 2. Botón Mis Pedidos */}
            <Button variant="link" size="sm" onPress={() => router.push('/pedidos')}>
              <Text className="text-lg font-semibold text-zinc-600">Mis Pedidos</Text>
            </Button>

            {/* 3. Botón de Perfil (reemplaza 'Iniciar Sesión') */}
            <Button
              onPress={() => router.push('/perfil')}
              className="rounded-lg bg-[#1e56a0] px-4 py-2">
              <Text className="text-lg font-bold text-white">Perfil</Text>
            </Button>

            {/* 4. Botón Cerrar Sesión (conservado) */}
            <Button variant="link" size="sm" onPress={logoutAuth}>
              <Text className="text-lg font-semibold text-red-600">Cerrar sesión</Text>
            </Button>
          </View>
        ) : (
          // --- Si el usuario NO está autenticado ---
          <Button
            onPress={() => router.push('/login')}
            className="rounded-lg bg-[#1e56a0] px-4 py-2">
            <Text className="text-lg font-bold text-white">Iniciar sesión</Text>
          </Button>
        )}
        {/* --- FIN DE SECCIÓN MODIFICADA --- */}
      </View>
    </View>
  );
};

export default memo(Header);
