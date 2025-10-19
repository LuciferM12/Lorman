import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
// @ts-ignore: module declaration for PNG assets is not present in this project
import LOGO_IMAGE from '@/assets/images/lorman-logo.png';
export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center px-5 bg-[#F8F9FA]">
      <Image
        source={LOGO_IMAGE}
        className="w-[90px] h-[90px] mb-1"
        resizeMode="contain"
      />
      
      <Text className="text-2xl md:text-3xl font-bold text-primaryDark text-center mb-3 px-4">
        Página no encontrada
      </Text>

      <Text className="text-base text-gray text-center mb-8 leading-6 px-4 max-w-md">
        Parece que la pantalla que buscas no existe o fue movida a otro lugar.
      </Text>

      <Link href={"/" as any} asChild>
        <Pressable
          className="bg-primaryLight px-9 py-3.5 rounded-full shadow-md active:opacity-80"
        >
          <Text className="text-white font-bold text-base">
            Ir a la pantalla de inicio
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}