import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { Text, View } from 'react-native';

const FAQ_DATA = [
  {
    question: 'What is your return policy?',
    answer:
      "We stand behind our products with a comprehensive 30-day return policy. If you're not completely satisfied, simply return the item in its original condition.",
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Shipping times vary based on your location, but most orders are delivered within 5-7 business days.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to many countries worldwide. Shipping fees and delivery times may vary.',
  },
  {
    question: 'How can I track my order?',
    answer:
      "Once your order is shipped, you will receive a tracking number via email to monitor your package's progress.",
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and other secure payment methods.',
  },
];

const nosotros = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="flex max-w-[90%] items-center p-4 lg:w-[1920px]">
        <Text className="text-primaryDark mb-4 text-center text-4xl font-bold">
          Preguntas Frecuentes
        </Text>
        <Text className="text-primaryDark/75 mb-8 text-center text-xl">
          Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.
        </Text>
        <Accordion type="single" collapsible className="w-3/4" defaultValue="item-1">
          {FAQ_DATA.map((faq, index) => (
            <View key={`faq-${index}`} className="w-full">
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>
                  <Text className="text-primaryDark text-2xl font-semibold">{faq.question}</Text>
                </AccordionTrigger>
                <AccordionContent>
                  <Text className="text-lg">{faq.answer}</Text>
                </AccordionContent>
              </AccordionItem>
              <Separator key={`sep-${index}`} className="my-3" />
            </View>
          ))}
        </Accordion>
      </View>
    </View>
  )
}

export default nosotros