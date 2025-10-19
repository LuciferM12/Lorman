// screens/ContactScreen.tsx
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Linking, Pressable } from 'react-native';
import { MapPin, Phone, Mail } from 'lucide-react-native';
import ContactForm from '@/components/custom/contact/contactForm';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import Banner from '@/components/custom/banner/banner';
import LormanFooter from '@/components/custom/Footer';

export default function ContactScreen() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const address = 'Tangamanga, 78399 San Luis Potosí, S.L.P.';
  const openInMaps = () => {
    Linking.openURL(
      'https://www.google.com/maps/place/Agua+Purificada+Lorman/@22.1373347,-100.9279152,15z/data=!4m6!3m5!1s0x842aa24d33aaaaab:0x8eb23a6e1c9cdaa5!8m2!3d22.1373347!4d-100.9279152!16s%2Fg%2F11gh0kyz6m'
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Banner
          size="small"
          title="Contacto"
          subtitle="Descubre las diferentes formas de ponerte en contacto con nosotros. Estamos aquí para ayudarte y responder a todas tus preguntas."
          buttonText="Ver Ubicación"
          imageSource={{uri: 'https://res.cloudinary.com/dhvb4jesa/image/upload/agua_g5dp4e.jpg'}}
          scrollOffset={scrollOffset}
          onButtonPress={() => {
            console.log('Navegando a productos...');
          }}
        />

        <View className="mx-auto w-full max-w-6xl gap-8 p-6 md:flex-row md:items-start mb-6">
          {/* Columna Izquierda - Información de Contacto */}
          <View className="flex-1 gap-8">
            {/* Información de Contacto */}
            <View>
              <Text className="mb-6 text-2xl font-bold text-[#0d4682]">
                Información de Contacto
              </Text>

              <View className="gap-6">
                {/* Dirección */}
                <Pressable onPress={openInMaps}>
                  <View className="flex-row items-start gap-4">
                    <View className="h-12 w-12 items-center justify-center rounded-full bg-[#17a2b8]">
                      <MapPin size={24} color="#fff" />
                    </View>
                    <View className="flex-1">
                      <Text className="mb-1 text-base font-semibold text-gray-800">Dirección</Text>
                      <Text className="text-sm text-gray-600 underline">{address}</Text>
                      <Text className="mt-1 text-xs text-[#17a2b8]">Toca para ver en el mapa</Text>
                    </View>
                  </View>
                </Pressable>

                {/* Teléfono */}
                <Pressable onPress={() => Linking.openURL('tel:1234567890')}>
                  <View className="flex-row items-start gap-4">
                    <View className="h-12 w-12 items-center justify-center rounded-full bg-[#17a2b8]">
                      <Phone size={24} color="#fff" />
                    </View>
                    <View className="flex-1">
                      <Text className="mb-1 text-base font-semibold text-gray-800">Teléfono</Text>
                      <Text className="text-sm text-gray-600 underline">(123) 456-7890</Text>
                    </View>
                  </View>
                </Pressable>

                {/* Correo Electrónico */}
                <Pressable onPress={() => Linking.openURL('mailto:contacto@lorman.com')}>
                  <View className="flex-row items-start gap-4">
                    <View className="h-12 w-12 items-center justify-center rounded-full bg-[#17a2b8]">
                      <Mail size={24} color="#fff" />
                    </View>
                    <View className="flex-1">
                      <Text className="mb-1 text-base font-semibold text-gray-800">
                        Correo Electrónico
                      </Text>
                      <Text className="text-sm text-gray-600 underline">contacto@lorman.com</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>

            {/* Horario de Atención */}
            <View>
              <Text className="mb-4 text-2xl font-bold text-[#0d4682]">Horario de Atención</Text>

              <View className="gap-2">
                <View className="flex-row">
                  <Text className="w-32 text-sm font-semibold text-gray-800">Lunes a Viernes:</Text>
                  <Text className="text-sm text-gray-600">9:00 AM - 6:00 PM</Text>
                </View>

                <View className="flex-row">
                  <Text className="w-32 text-sm font-semibold text-gray-800">Sábado:</Text>
                  <Text className="text-sm text-gray-600">9:00 AM - 2:00 PM</Text>
                </View>

                <View className="flex-row">
                  <Text className="w-32 text-sm font-semibold text-gray-800">Domingo:</Text>
                  <Text className="text-sm text-gray-600">Cerrado</Text>
                </View>
              </View>
            </View>

            {/* Ubicación en Mapa */}
            <View>
              <Pressable onPress={openInMaps} className="mt-2 rounded-lg bg-[#17a2b8] p-3">
                <Text className="text-center text-sm font-semibold text-white">
                  Abrir en Google Maps
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Columna Derecha - Formulario de Contacto */}
          <View className="flex-1">
            <ContactForm />
          </View>
        </View>
        <LormanFooter />
      </Animated.ScrollView>
    </View>
  );
}
