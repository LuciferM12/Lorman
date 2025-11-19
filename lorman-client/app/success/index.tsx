import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      {/* Ícono principal de éxito */}
      <Animated.View
        entering={FadeInDown.delay(200).duration(800)}
        className="mb-8 rounded-full bg-green-100 p-6 shadow-lg">
        <Ionicons name="checkmark-circle" size={100} color="#22c55e" />
      </Animated.View>

      {/* Texto principal */}
      <Animated.View entering={FadeInDown.delay(400).duration(800)}>
        <Text className="mb-3 text-center text-4xl font-bold text-green-600">¡Pago Exitoso!</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(600).duration(800)} className="mb-6">
        <Text className="mt-5 px-4 text-center text-lg leading-7 text-gray-700">
          Tu pedido ha sido procesado correctamente.{'\n'}
          Recibirás la confirmación vía email.
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(700).duration(800)} className="mb-10">
        <Text className="mt-7 text-center text-base text-gray-600">
          Gracias por confiar en <Text className="font-bold text-[#17a2b8]">Lorman</Text>
        </Text>
      </Animated.View>

      {/* Botón - CORREGIDO */}
      <Animated.View
        entering={FadeInDown.delay(900).duration(800)}
        className="w-full max-w-sm px-8">
        <Pressable
          onPress={() => router.push('/')}
          className="items-center justify-center rounded-xl bg-[#17a2b8] py-4 shadow-md active:opacity-80">
          <Text className="text-lg font-bold text-white">Regresar al Inicio</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
