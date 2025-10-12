import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { Button } from '../ui/button';
import { COLORS } from '@/constants/colors';

const data: { id: number; title: string }[] = [
  { id: 1, title: 'Inicio' },
  { id: 2, title: 'Productos' },
  { id: 3, title: 'Nosotros' },
  { id: 4, title: 'Contacto' },
];

const Header = () => {
  return (
    <View className="absolute left-0 right-0 top-0 z-50 h-20 items-center justify-center">
      <View className="flex w-full flex-row items-center justify-between gap-2 p-4">
        <View className="flex flex-row items-center justify-center gap-1">
          <Image
            source={require('@/assets/images/lorman-logo.png')}
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
          />
          <Text className="text-3xl font-semibold text-blue-900">Lorman</Text>
        </View>

        <View className="flex flex-row items-center gap-6">
          {data.map((item) => (
            <Text key={item.id} className="text-lg font-semibold text-zinc-600">
              {item.title}
            </Text>
          ))}
        </View>
        <Button style={{ backgroundColor: COLORS.primaryLight }} className="text-lg text-white">
          Pedir ahora
        </Button>
      </View>
    </View>
  );
};

export default Header;
