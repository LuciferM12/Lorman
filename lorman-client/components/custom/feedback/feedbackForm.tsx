// components/FeedbackForm.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Alert, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

type FeedbackFormData = {
  fullName: string;
  email: string;
  orderNumber?: string;
  subject: string;
  message: string;
};

export default function FeedbackForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FeedbackFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      orderNumber: '',
      subject: '',
      message: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);

    try {
      // Aquí va tu lógica de envío
      console.log('Feedback enviado:', data);
      
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        'Mensaje Enviado',
        'Tu feedback ha sido enviado exitosamente. Nuestro equipo lo revisará pronto.',
        [
          {
            text: 'OK',
            onPress: () => reset(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al enviar tu mensaje.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl shadow-lg p-2 my-8">
      <CardContent className="p-8">
        {/* Título y Subtítulo */}
        <View className="mb-8">
          <Text className="mb-3 text-center text-3xl font-bold text-[#0d4682]">
            Envíanos tu Feedback
          </Text>
          <Text className="text-center text-sm text-gray-600">
            Ya sea una queja, una sugerencia para mejorar o una felicitación, valoramos mucho tu
            mensaje.
          </Text>
        </View>

        <View className="gap-6">
          {/* Fila: Nombre y Email */}
          <View className="gap-4 md:flex-row">
            {/* Nombre Completo */}
            <View className="flex-1 gap-2">
              <Label nativeID="fullName">Nombre Completo</Label>
              <Controller
                control={control}
                name="fullName"
                rules={{
                  required: 'El nombre es obligatorio',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Tu nombre completo"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    aria-labelledby="fullName"
                  />
                )}
              />
              {errors.fullName && (
                <Text className="text-sm text-destructive">{errors.fullName.message}</Text>
              )}
            </View>

            {/* Correo Electrónico */}
            <View className="flex-1 gap-2">
              <Label nativeID="email">Correo Electrónico</Label>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'El correo es obligatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="tu@email.com"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    aria-labelledby="email"
                  />
                )}
              />
              {errors.email && (
                <Text className="text-sm text-destructive">{errors.email.message}</Text>
              )}
            </View>
          </View>

          {/* Número de Pedido (Opcional) */}
          <View className="gap-2">
            <Label nativeID="orderNumber">Número de Pedido (Opcional)</Label>
            <Controller
              control={control}
              name="orderNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Ej: LOR-12345"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  aria-labelledby="orderNumber"
                />
              )}
            />
          </View>

          {/* Asunto */}
          <View className="gap-2">
            <Label nativeID="subject">Asunto</Label>
            <Controller
              control={control}
              name="subject"
              rules={{
                required: 'El asunto es obligatorio',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Asunto del mensaje"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  aria-labelledby="subject"
                />
              )}
            />
            {errors.subject && (
              <Text className="text-sm text-destructive">{errors.subject.message}</Text>
            )}
          </View>

          {/* Mensaje */}
          <View className="gap-2">
            <Label nativeID="message">Mensaje</Label>
            <Controller
              control={control}
              name="message"
              rules={{
                required: 'El mensaje es obligatorio',
                minLength: {
                  value: 10,
                  message: 'El mensaje debe tener al menos 10 caracteres',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Describe detalladamente tu queja o sugerencia aquí..."
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={5}
                  style={{ height: 120, textAlignVertical: 'top' }}
                  aria-labelledby="message"
                />
              )}
            />
            {errors.message && (
              <Text className="text-sm text-destructive">{errors.message.message}</Text>
            )}
          </View>

          {/* Botón de Envío */}
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="mt-2 w-full bg-[#17a2b8]">
            <Text className="font-semibold text-white">
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </Text>
          </Button>

          {/* Texto Informativo */}
          <Text className="text-center text-xs text-gray-500">
            Nuestro equipo de atención al cliente revisará tu mensaje y se pondrá en contacto
            contigo a la brevedad si es necesario. Agradecemos tu tiempo y tu confianza.
          </Text>
        </View>
      </CardContent>
    </Card>
  );
}