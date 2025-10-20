import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gradient-to-b from-green-50 to-white items-center justify-center p-6">
      {/* Ícono principal de éxito */}
      <Animated.View 
        entering={FadeInDown.delay(200).duration(800)} 
        className="bg-green-100 rounded-full p-6 mb-8 shadow-lg"
      >
        <Ionicons name="checkmark-circle" size={100} color="#22c55e" />
      </Animated.View>

      {/* Texto principal */}
      <Animated.Text
        entering={FadeInDown.delay(400).duration(800)}

        style={{ letterSpacing: 0.5 }}
      >
        <Text className="text-4xl font-bold text-green-600 mb-3 text-center m-6">¡Pago Exitoso!</Text>
        
      </Animated.Text>

      <Animated.View entering={FadeInDown.delay(600).duration(800)} className="mb-6">
        <Text className="text-lg text-gray-700 text-center leading-7 px-4 mt-5">
          Tu pedido ha sido procesado correctamente.{'\n'}
          Recibirás la confirmación vía email.
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(700).duration(800)} className="mb-10">
        <Text className="text-base text-gray-600 text-center mt-7">
          Gracias por confiar en{' '}
          <Text className="font-bold text-[#17a2b8] mb-7">Lorman</Text>
        </Text>
      </Animated.View>

      {/* Botón */}
      <Animated.View 
        entering={FadeInDown.delay(900).duration(800)} 
        className="w-full max-w-sm px-8" 
      >
        <Button
          onPress={() => router.push('/')}
          className="bg-[#17a2b8] py-4 rounded-xl shadow-md m-7"
        >
          <Text className="text-white text-lg font-bold">Regresar al Inicio</Text>
        </Button>
      </Animated.View>
    </View>
  );
}
