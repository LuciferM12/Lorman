// components/ContactForm.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Aquí va tu lógica de envío
      console.log('Mensaje enviado:', data);
      
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        'Mensaje Enviado',
        'Tu mensaje ha sido enviado exitosamente. Te contactaremos pronto.',
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
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Text className="text-2xl font-bold text-[#0d4682] mb-6">
          Envíanos un mensaje
        </Text>

        <View className="gap-4">
          {/* Nombre */}
          <View className="gap-2">
            <Label nativeID="name">Nombre</Label>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'El nombre es obligatorio',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Tu nombre"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  aria-labelledby="name"
                />
              )}
            />
            {errors.name && (
              <Text className="text-sm text-destructive">
                {errors.name.message}
              </Text>
            )}
          </View>

          {/* Correo Electrónico */}
          <View className="gap-2">
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
              <Text className="text-sm text-destructive">
                {errors.email.message}
              </Text>
            )}
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
              <Text className="text-sm text-destructive">
                {errors.subject.message}
              </Text>
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
                  placeholder="Escribe tu mensaje aquí..."
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
              <Text className="text-sm text-destructive">
                {errors.message.message}
              </Text>
            )}
          </View>

          {/* Botón de Envío */}
          <View className="items-end mt-2">
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-[#17a2b8] px-8"
            >
              <Text className="text-white font-semibold">
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </Text>
            </Button>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}