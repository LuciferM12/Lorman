import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { Text, View } from 'react-native';
import Banner from '@/components/custom/banner/banner';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import AccountDeletionForm from '@/components/custom/policyForm/policyForm';

const POLICIES = [
  {
    policy: 'Aviso de privacidad',
    content:
      'En Lorman, nos comprometemos a proteger tu privacidad. Nuestro Aviso de Privacidad completo detalla qué información recopilamos, cómo la usamos y las medidas que tomamos para protegerla. [Aquí puedes añadir un enlace al documento completo o detallarlo].',
  },
  {
    policy: 'Términos de uso',
    content:
      'Al utilizar nuestro sitio web y aplicación, aceptas nuestros Términos de Uso. Este documento rige tu uso de nuestros servicios, tus responsabilidades como usuario y nuestras responsabilidades como proveedor. [Aquí puedes añadir un enlace al documento completo o detallarlo].',
  },
  {
    policy: 'Políticas de Devolución, Entregas y Reembolsos',
    content:
      'Buscamos tu completa satisfacción. Nuestras políticas detallan los procedimientos para devoluciones de productos, los tiempos y condiciones de entrega, y el proceso para solicitar reembolsos en caso de ser aplicable. [Aquí puedes añadir un enlace al documento completo o detallarlo].',
  },
];

const politicas = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <View className="flex-1 bg-white">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Banner
          size="small"
          title="Nuestras Políticas"
          subtitle="Transparencia y compromiso con nuestros clientes."
          buttonText="Ver mas..."
          imageSource={require('@/assets/images/agua.jpg')}
          scrollOffset={scrollOffset}
          onButtonPress={() => {
            console.log('Navegando a productos...');
          }}
        />

        <View className="flex items-center justify-center p-4 py-12">
          <View className="w-full max-w-[90%] items-center lg:w-[1920px]">
            <Accordion type="single" collapsible className="w-full lg:w-3/4" defaultValue="item-0">
              {POLICIES.map((policy, index) => (
                <View key={`faq-${index}`} className="w-full">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>
                      <Text className="text-xl font-semibold text-primaryDark lg:text-2xl">
                        {policy.policy}
                      </Text>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Text className="text-base lg:text-lg">{policy.content}</Text>
                    </AccordionContent>
                  </AccordionItem>
                  {index < POLICIES.length - 1 && <Separator className="my-3" />}
                </View>
              ))}
            </Accordion>

            <Separator className="m-10" />

            <Text className="mb-4 text-center text-4xl font-bold text-primaryDark">
              Formulario de solicitud
            </Text>
            <Text className="mb-8 text-center text-xl text-primaryDark/75">
              Utiliza este formulario para solicitar la eliminación (cancelación) de tu información
              personal de nuestras bases de datos.
            </Text>

            <AccountDeletionForm />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default politicas;
