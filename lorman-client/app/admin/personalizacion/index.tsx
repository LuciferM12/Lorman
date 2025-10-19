import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import BannerManager from '@/components/custom/customize/BannerManager';
import PromocionForm from '@/components/custom/customize/PromotionForm';
import PromocionList, { type Promocion } from '@/components/custom/customize/PromotionList';
import FAQForm from '@/components/custom/customize/FAQForm';
import FAQList, { type FAQ } from '@/components/custom/customize/FAQList';

export default function PersonalizacionScreen() {
  // Estados
  const [promociones, setPromociones] = React.useState<Promocion[]>([
    {
      id: 1,
      titulo: 'Envío Gratis en pedidos mayores a $200',
      descripcion: 'Válido hasta el 31 de Diciembre',
      fechaVencimiento: '31 de Diciembre',
    },
  ]);

  const [faqs, setFaqs] = React.useState<FAQ[]>([
    {
      id: 1,
      pregunta: '¿Cuáles son los métodos de pago aceptados?',
      respuesta:
        'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, Amex), así como pagos a través de PayPal.',
    },
  ]);

  // Handlers para Banner
  const handleBannerChange = (imageUri: string) => {
    console.log('Nuevo banner:', imageUri);
    // Aquí llamarías a tu API para guardar el banner
    // await fetch('api/banner', { method: 'POST', body: ... })
  };

  // Handlers para Promociones
  const handleAddPromocion = (data: { titulo: string; descripcion: string }) => {
    const nuevaPromocion: Promocion = {
      id: Date.now(),
      titulo: data.titulo,
      descripcion: data.descripcion,
      fechaVencimiento: 'Sin fecha',
    };
    setPromociones([...promociones, nuevaPromocion]);
    Alert.alert('Éxito', 'Promoción agregada correctamente');
  };

  const handleEditPromocion = (promocion: Promocion) => {
    console.log('Editar promoción:', promocion);
    // Aquí abrirías un modal o navegarías a editar
  };

  const handleDeletePromocion = (id: number) => {
    setPromociones(promociones.filter((p) => p.id !== id));
  };

  // Handlers para FAQs
  const handleAddFAQ = (data: { pregunta: string; respuesta: string }) => {
    const nuevaFAQ: FAQ = {
      id: Date.now(),
      pregunta: data.pregunta,
      respuesta: data.respuesta,
    };
    setFaqs([...faqs, nuevaFAQ]);
    Alert.alert('Éxito', 'Pregunta frecuente agregada correctamente');
  };

  const handleEditFAQ = (faq: FAQ) => {
    console.log('Editar FAQ:', faq);
    // Aquí abrirías un modal o navegarías a editar
  };

  const handleDeleteFAQ = (id: number) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-8">
        <Text className="mb-6 text-2xl font-bold text-gray-800">Personalización</Text>

        <View className="gap-6">
          {/* Sección 1: Banner Principal */}
          <BannerManager onBannerChange={handleBannerChange} />

          {/* Sección 2: Gestionar Promociones */}
          <Card>
            <CardContent className="p-6">
              <Text className="mb-4 text-xl font-bold text-[#0d4682]">Gestionar Promociones</Text>

              <View className="gap-6">
                <PromocionForm onSubmit={handleAddPromocion} />
                <PromocionList
                  promociones={promociones}
                  onEdit={handleEditPromocion}
                  onDelete={handleDeletePromocion}
                />
              </View>
            </CardContent>
          </Card>

          {/* Sección 3: Preguntas Frecuentes (FAQ) */}
          <Card>
            <CardContent className="p-6">
              <Text className="mb-4 text-xl font-bold text-[#0d4682]">
                Gestionar Preguntas Frecuentes (FAQ)
              </Text>

              <View className="gap-6">
                <FAQForm onSubmit={handleAddFAQ} />
                <FAQList faqs={faqs} onEdit={handleEditFAQ} onDelete={handleDeleteFAQ} />
              </View>
            </CardContent>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}