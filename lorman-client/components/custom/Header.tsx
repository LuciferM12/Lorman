import React, { memo, useState } from 'react';
import { Text, View, Image, Pressable, Modal, SafeAreaView } from 'react-native';
import { Button } from '../ui/button';
import { Link, useRouter, usePathname } from 'expo-router';

// @ts-ignore: module declaration for PNG assets is not present in this project
import LOGO_IMAGE from '@/assets/images/lorman-logo.png';
import { useAuth } from '@/context/AuthContext';

import { ShoppingCart, Menu, X } from 'lucide-react-native';

const NAV_ITEMS = [
  { id: 1, title: 'Productos', route: '/productos' },
  { id: 2, title: 'Nosotros', route: '/nosotros' },
  { id: 3, title: 'Contacto', route: '/contacto' },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logoutAuth } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuNavigation = (route: string) => {
    setIsMobileMenuOpen(false);
    router.push(route as any);
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    logoutAuth();
  };

  return (
    <>
      <View className="absolute left-0 right-0 top-0 z-50 h-20 items-center justify-center bg-white shadow-sm">
        <View className="flex w-full max-w-[1920px] flex-row items-center justify-between px-6">
          <Link href="/" asChild>
            <Pressable className="flex-row items-center gap-1 active:opacity-80">
              <Image source={LOGO_IMAGE} style={{ width: 70, height: 70, resizeMode: 'contain' }} />
              <Text className="text-3xl font-semibold text-blue-900">Lorman</Text>
            </Pressable>
          </Link>

          <View className="hidden lg:flex lg:flex-row lg:items-center lg:gap-6">
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

            {isAuthenticated ? (
              <View className="flex-row items-center gap-4">
                
                <Button variant="link" size="sm" onPress={() => router.push('/pedidos')}>
                  <Text className="text-lg font-semibold text-zinc-600">Mis Pedidos</Text>
                </Button>
                <Pressable onPress={() => router.push('/carrito')} className="active:opacity-70">
                  <ShoppingCart color="#172554" size={28} />
                </Pressable>
                <Button
                  onPress={() => router.push('/perfil')}
                  className="rounded-lg bg-[#1e56a0] px-4 py-2">
                  <Text className="text-lg font-bold text-white">Perfil</Text>
                </Button>
                <Button variant="link" size="sm" onPress={logoutAuth}>
                  <Text className="text-lg font-semibold text-red-600">Cerrar sesión</Text>
                </Button>
              </View>
            ) : (
              <Button
                onPress={() => router.push('/login')}
                className="rounded-lg bg-[#1e56a0] px-4 py-2">
                <Text className="text-lg font-bold text-white">Iniciar sesión</Text>
              </Button>
            )}
          </View>

          <Pressable className="lg:hidden" onPress={() => setIsMobileMenuOpen(true)}>
            <Menu color="#172554" size={32} />
          </Pressable>
        </View>
      </View>

      <Modal
        visible={isMobileMenuOpen}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsMobileMenuOpen(false)}>
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row items-center justify-between p-4">
            <Text className="text-2xl font-semibold text-blue-900">Menú</Text>
            <Pressable onPress={() => setIsMobileMenuOpen(false)}>
              <X color="#172554" size={32} />
            </Pressable>
          </View>

          <View className="flex-1 gap-4 p-6">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.route;
              return (
                <Pressable key={item.id} onPress={() => handleMenuNavigation(item.route)}>
                  <Text
                    className={`text-2xl font-semibold ${
                      isActive ? 'text-blue-700' : 'text-zinc-600'
                    }`}>
                    {item.title}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View className="gap-4 border-t border-zinc-200 p-6">
            {isAuthenticated ? (
              <>
                <Button onPress={() => handleMenuNavigation('/carrito')} className="bg-blue-800">
                  <Text className="text-lg font-bold text-white">Ver Carrito</Text>
                </Button>
                <Button onPress={() => handleMenuNavigation('/pedidos')} className="bg-blue-800">
                  <Text className="text-lg font-bold text-white">Mis Pedidos</Text>
                </Button>
                <Button onPress={() => handleMenuNavigation('/perfil')} className="bg-[#1e56a0]">
                  <Text className="text-lg font-bold text-white">Perfil</Text>
                </Button>
                <Button variant="link" onPress={handleLogout}>
                  <Text className="text-lg font-semibold text-red-600">Cerrar sesión</Text>
                </Button>
              </>
            ) : (
              <Button
                onPress={() => handleMenuNavigation('/login')}
                className="rounded-lg bg-[#1e56a0] px-4 py-2">
                <Text className="text-lg font-bold text-white">Iniciar sesión</Text>
              </Button>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default memo(Header);
