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
import FeatureCard from '@/components/custom/featureCard';
import Process from '@/components/custom/process/process';
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import LormanFooter from '@/components/custom/Footer';
import FeedbackForm from '@/components/custom/feedback/feedbackForm';

const FAQ_DATA = [
  {
    question: '¿Cuál es su política de devoluciones?',
    answer:
      'Respaldamos nuestros productos con una política de devolución de 30 días. Si no estás completamente satisfecho, simplemente devuelve el artículo en su estado original.',
  },
  {
    question: '¿Cuánto tarda el envío?',
    answer:
      'El tiempo de envío varía según tu ubicación, pero la mayoría de los pedidos se entregan en un plazo de 5 a 7 días hábiles.',
  },
  {
    question: '¿Ofrecen envíos internacionales?',
    answer:
      'Sí, realizamos envíos a muchos países del mundo. Las tarifas y los tiempos de entrega pueden variar.',
  },
  {
    question: '¿Cómo puedo rastrear mi pedido?',
    answer:
      'Una vez que tu pedido sea enviado, recibirás un número de seguimiento por correo electrónico para monitorear el progreso de tu paquete.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos todas las principales tarjetas de crédito, PayPal y otros métodos de pago seguros.',
  },
];

const features: {
  iconName: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
}[] = [
  {
    iconName: 'target',
    title: 'Misión',
    description:
      'Proveer agua purificada y hielo de la más alta calidad, contribuyendo a la salud y bienestar de las familias y negocios.',
  },
  {
    iconName: 'eye',
    title: 'Visión',
    description:
      'Ser la empresa líder en el mercado local de agua y hielo, reconocida por nuestra innovación, compromiso y excelencia.',
  },
  {
    iconName: 'heart',
    title: 'Valores',
    description:
      'Calidad, Confianza, Puntualidad, Integridad y Compromiso son los pilares que guían nuestras acciones.',
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
        showsVerticalScrollIndicator={false}>
        <Banner
          size="small"
          title="Comprometidos con tu Bienestar"
          subtitle="Conoce la historia y los valores que hacen de Lorman tu mejor opción."
          buttonText="Preguntas Frecuentes"
          imageSource={require('@/assets/images/agua.jpg')}
          scrollOffset={scrollOffset}
          onButtonPress={() => {
            console.log('Navegando a productos...');
          }}
        />

        <View className="flex items-center justify-center p-4 py-12">
          <View className="w-full max-w-[90%] items-center lg:w-[1920px]">
            <View className="mb-8 w-full flex-row items-start justify-around">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  iconName={feature.iconName}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </View>

            <Separator className="m-10" />

            <Text className="mb-4 text-center text-4xl font-bold text-primaryDark">
              Nuestro proceso de purificación
            </Text>
            <Text className="mb-8 text-center text-xl text-primaryDark/75">
              Descubre cómo garantizamos la pureza y calidad en cada gota de agua que entregamos.
            </Text>

            <Process />

            <Separator className="m-10" />

            <Text className="mb-4 text-center text-4xl font-bold text-primaryDark">
              Preguntas Frecuentes
            </Text>
            <Text className="mb-8 text-center text-xl text-primaryDark/75">
              Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.
            </Text>

            <Accordion type="single" collapsible className="w-full lg:w-3/4" defaultValue="item-0">
              {FAQ_DATA.map((faq, index) => (
                <View key={`faq-${index}`} className="w-full">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>
                      <Text className="text-xl font-semibold text-primaryDark lg:text-2xl">
                        {faq.question}
                      </Text>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Text className="text-base lg:text-lg">{faq.answer}</Text>
                    </AccordionContent>
                  </AccordionItem>
                  {index < FAQ_DATA.length - 1 && <Separator className="my-3" />}
                </View>
              ))}
            </Accordion>
          </View>
        </View>

        <Separator className="m-10" />
        <FeedbackForm />

        <LormanFooter />
      </Animated.ScrollView>
    </View>
  );
};

export default nosotros;
