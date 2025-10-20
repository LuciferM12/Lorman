import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Image, Linking, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react-native';

export default function LormanFooter() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:contacto@lorman.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:1234567890');
  };

  const handlePrivacyPress = () => {
    console.log('Navegar a Aviso de Privacidad');
  };

  const handleTermsPress = () => {
    console.log('Navegar a Términos y Condiciones');
  };

  const handleSocialPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View className="bg-[#0d4682] px-6 py-8">
      {/* Contenedor principal */}
      <View className="gap-8 pb-8 md:flex-row md:justify-between">
        {/* Columna Lorman */}
        <View className="md:flex-1">
          <Text className="mb-2 text-lg font-bold text-white">Lorman</Text>
          <Text className="mb-4 text-sm text-white/90">Pureza que Refresca tu Vida.</Text>
          <Image
            source={require('@/assets/images/lorman-logo.png')}
            style={{ width: 85, height: 85 }}
            resizeMode="contain"
          />
        </View>

        {/* Columna Contacto */}
        <View className="md:flex-1 md:px-4">
          <Text className="mb-3 text-lg font-bold text-white">Contacto</Text>

          <View className="gap-2">
            <View>
              <Text className="text-sm font-semibold text-white/90">
                Dirección:{' '}
                <Text className="font-normal text-white">Av. Principal 123, Tu Ciudad</Text>
              </Text>
            </View>

            <Pressable onPress={handlePhonePress}>
              <Text className="text-sm font-semibold text-white/90">
                Teléfono: <Text className="font-normal text-white underline">(123) 456-7890</Text>
              </Text>
            </Pressable>

            <Pressable onPress={handleEmailPress}>
              <Text className="text-sm font-semibold text-white/90">
                Email: <Text className="font-normal text-white underline">contacto@lorman.com</Text>
              </Text>
            </Pressable>
          </View>

          {/* Redes Sociales */}
          <View className="mt-4">
            <Text className="mb-2 text-sm font-semibold text-white/90">Síguenos:</Text>
            <View className="flex-row gap-4">
              <Pressable 
                onPress={() => handleSocialPress('https://www.facebook.com/LormanAgua/?locale=es_LA')}
                className="rounded-full bg-white/10 p-2 active:bg-white/20"
              >
                <Facebook color="white" size={24} />
              </Pressable>

              <Pressable 
                onPress={() => handleSocialPress('https://www.instagram.com/agualorman/')}
                className="rounded-full bg-white/10 p-2 active:bg-white/20"
              >
                <Instagram color="white" size={24} />
              </Pressable>

              <Pressable 
                onPress={() => handleSocialPress('https://x.com/lormanslp?lang=ar-x-fm')}
                className="rounded-full bg-white/10 p-2 active:bg-white/20"
              >
                <Twitter color="white" size={24} />
              </Pressable>

              <Pressable 
                onPress={() => handleSocialPress('https://www.youtube.com/@LormanSLP?app=desktop')}
                className="rounded-full bg-white/10 p-2 active:bg-white/20"
              >
                <Youtube color="white" size={24} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Columna Legal */}
        <View className="md:flex-1">
          <Text className="mb-3 text-lg font-bold text-white">Legal</Text>

          <View className="gap-2">
            <Link href="/politicas">
              <Pressable onPress={handlePrivacyPress}>
                <Text className="text-sm text-white/90 underline">Aviso de Privacidad</Text>
              </Pressable>
            </Link>

            <Link href="/politicas">
              <Pressable onPress={handleTermsPress}>
                <Text className="text-sm text-white/90 underline">Términos de uso</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      {/* Línea divisoria */}
      <View className="border-t border-white/20 pt-4">
        <Text className="text-center text-xs text-white/70">
          © 2024 Lorman. Todos los derechos reservados.
        </Text>
      </View>
    </View>
  );
}