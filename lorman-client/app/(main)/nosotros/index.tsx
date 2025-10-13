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

import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";

const FAQ_DATA = [
  {
    question: '¿Cuál es su política de devoluciones?',
    answer:
      "Respaldamos nuestros productos con una política de devolución de 30 días. Si no estás completamente satisfecho, simplemente devuelve el artículo en su estado original.",
  },
  {
    question: '¿Cuánto tarda el envío?',
    answer:
      'El tiempo de envío varía según tu ubicación, pero la mayoría de los pedidos se entregan en un plazo de 5 a 7 días hábiles.',
  },
  {
    question: '¿Ofrecen envíos internacionales?',
    answer: 'Sí, realizamos envíos a muchos países del mundo. Las tarifas y los tiempos de entrega pueden variar.',
  },
  {
    question: '¿Cómo puedo rastrear mi pedido?',
    answer:
      "Una vez que tu pedido sea enviado, recibirás un número de seguimiento por correo electrónico para monitorear el progreso de tu paquete.",
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos todas las principales tarjetas de crédito, PayPal y otros métodos de pago seguros.',
  },
];

const nosotros = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <View className="flex-1 bg-white">
      <Animated.ScrollView 
        ref={scrollRef} 
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner pequeño con parallax */}
        <Banner
          size="small"
          title="Conoce sobre nosotros"
          subtitle="Calidad y confianza en cada gota. Llevamos la frescura del agua y hielo Lorman directamente a tu hogar."
          buttonText="Descúbrenos"
          imageSource={require('@/assets/images/agua.jpg')}
          scrollOffset={scrollOffset}
          onButtonPress={() => {
            console.log('Navegando a productos...');
          }}
        />

        {/* Contenido de FAQ */}
        <View className="flex items-center justify-center p-4 py-12">
          <View className="w-full max-w-[90%] items-center lg:w-[1920px]">
            <Text className="text-primaryDark mb-4 text-center text-4xl font-bold">
              Preguntas Frecuentes
            </Text>
            <Text className="text-primaryDark/75 mb-8 text-center text-xl">
              Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.
            </Text>
            
            <Accordion 
              type="single" 
              collapsible 
              className="w-full lg:w-3/4" 
              defaultValue="item-0"
            >
              {FAQ_DATA.map((faq, index) => (
                <View key={`faq-${index}`} className="w-full">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>
                      <Text className="text-primaryDark text-xl font-semibold lg:text-2xl">
                        {faq.question}
                      </Text>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Text className="text-base lg:text-lg">
                        {faq.answer}
                      </Text>
                    </AccordionContent>
                  </AccordionItem>
                  {index < FAQ_DATA.length - 1 && (
                    <Separator className="my-3" />
                  )}
                </View>
              ))}
            </Accordion>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

export default nosotros