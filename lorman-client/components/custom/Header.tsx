import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { Button } from '../ui/button';
import { COLORS } from '@/constants/colors';
import { Link, useRouter } from 'expo-router';

const data = [
  { id: 1, title: 'Inicio', route: '/' },
  { id: 2, title: 'Productos', route: '/productos' },
  { id: 3, title: 'Nosotros', route: '/nosotros' },
  { id: 4, title: 'Contacto', route: '/contacto' },
];

const LOGO_IMAGE = require('@/assets/images/lorman-logo.png');

const Header = () => {
  const router = useRouter();

  return (
    <View className="absolute left-0 right-0 top-0 z-50 h-20 items-center justify-center bg-white">
      <View className="flex w-full flex-row items-center justify-between gap-2 p-4">
        <Link href={'./'}>
          <Pressable>
            <View className="flex flex-row items-center justify-center gap-1">
              <Image source={LOGO_IMAGE} style={{ width: 80, height: 80 }} />
              <Text className="text-3xl font-semibold text-blue-900">Lorman</Text>
            </View>
          </Pressable>
        </Link>

        <View className="hidden flex-row items-center gap-6 md:flex">
          {data.map((item) => (
            <Link href={item.route as any} key={item.id}>
              <Pressable className="active:opacity-60">
                <Text className="text-lg font-semibold text-zinc-600 hover:text-blue-700">
                  {item.title}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>

        <Button
          onPress={() => router.push('/pedido' as any)}
          style={{ backgroundColor: COLORS.primaryLight }}
          className="text-lg text-white">
          <Text>Pedir ahora</Text>
        </Button>
      </View>
    </View>
  );
};

export default React.memo(Header);
