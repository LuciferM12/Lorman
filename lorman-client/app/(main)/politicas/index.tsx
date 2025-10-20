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
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import AccountDeletionForm from '@/components/custom/policyForm/policyForm';
import LormanFooter from '@/components/custom/Footer';

const POLICIES = [
  {
    policy: 'Aviso de privacidad',
    content: `
En Lorman valoramos y respetamos la privacidad de nuestros usuarios y clientes. 
Toda la información personal que recopilamos es tratada con estricta confidencialidad y conforme a la legislación vigente en materia de protección de datos personales.

1. Información que recopilamos: 
Recopilamos datos personales como nombre, dirección, correo electrónico, número telefónico, y datos de pago, con el único propósito de procesar tus pedidos, realizar entregas y ofrecerte una mejor experiencia de servicio.

2. Uso de la información: 
Tu información se utiliza únicamente para los fines relacionados con la operación de nuestros servicios: gestión de pedidos, atención al cliente, facturación y notificaciones relevantes.

3. Protección de datos: 
Implementamos medidas técnicas, administrativas y de seguridad para evitar el acceso no autorizado, la alteración o divulgación de tu información.

4. Derechos del usuario: 
Puedes solicitar en cualquier momento el acceso, corrección o eliminación de tus datos personales escribiéndonos a nuestro correo de contacto oficial.
`,
  },
  {
    policy: 'Términos de uso',
    content: `
Al acceder y utilizar la plataforma digital de Lorman (sitio web o aplicación móvil), el usuario acepta los siguientes Términos de Uso:

1. Aceptación de las condiciones: 
El uso de nuestros servicios implica la aceptación plena de los presentes términos. En caso de no estar de acuerdo, el usuario deberá abstenerse de utilizar la plataforma.

2. Uso correcto de los servicios:
El usuario se compromete a utilizar la plataforma únicamente con fines legales, absteniéndose de realizar actividades fraudulentas, enviar información falsa o alterar el funcionamiento del sistema.

3. Propiedad intelectual:
Todos los contenidos, marcas, logotipos, textos, gráficos y software pertenecen a Lorman o a sus respectivos titulares, y están protegidos por las leyes de propiedad intelectual.

4. Responsabilidades:
Lorman se compromete a brindar servicios de calidad y disponibilidad continua, sin embargo, no será responsable por interrupciones o fallas técnicas ajenas a su control.

5. Modificaciones:
Lorman se reserva el derecho de modificar los presentes Términos de Uso en cualquier momento. Las actualizaciones estarán disponibles en esta misma página.
`,
  },
  {
    policy: 'Políticas de Devolución, Entregas y Reembolsos',
    content: `
En Lorman nos esforzamos por ofrecerte un servicio confiable y productos de calidad. No obstante, entendemos que pueden presentarse situaciones en las que sea necesario realizar una devolución o reembolso.

1. Entregas:
- Las entregas se realizan en los horarios establecidos al momento de la compra.  
- Si el cliente no se encuentra en el domicilio acordado, se podrá reprogramar la entrega con un posible costo adicional.  
- Lorman no se hace responsable por retrasos ocasionados por causas de fuerza mayor o externas a su control (clima, tráfico, accidentes, etc.).

2. Devoluciones: 
- Solo se aceptarán devoluciones de productos que presenten defectos de fabricación o errores en el pedido.  
- El cliente deberá notificar el problema dentro de las 24 horas posteriores a la recepción del producto.  
- El producto deberá mantenerse en su empaque original y sin uso.

3. Reembolsos: 
- Los reembolsos serán procesados una vez confirmada la devolución o cancelación del pedido.  
- El tiempo estimado para la acreditación del reembolso dependerá del método de pago utilizado, normalmente entre 5 y 10 días hábiles.  
- En pagos con tarjeta, el reembolso se realizará directamente al mismo método de pago.

4. Contacto:
Para cualquier aclaración o solicitud, comunícate con nuestro equipo de soporte a través del correo o número de atención al cliente disponible en nuestra plataforma.
`,
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

        <LormanFooter />
      </Animated.ScrollView>
    </View>
  );
};

export default politicas;
