import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  details: string;
};

export default function AccountDeletionForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      details: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Aquí va tu lógica de envío a la API
      console.log('Datos del formulario:', data);

      // Simulación de llamada API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        'Solicitud Enviada',
        'Tu solicitud ha sido enviada exitosamente. La procesaremos en un plazo de 5 a 10 días hábiles.',
        [
          {
            text: 'OK',
            onPress: () => reset(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerClassName="p-4"
      showsVerticalScrollIndicator={false}>
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Eliminación de Cuenta</CardTitle>
          <CardDescription>
            Completa el formulario para solicitar la eliminación de tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          {/* Nombre Completo */}
          <View className="gap-2">
            <Label nativeID="fullName">Nombre Completo</Label>
            <Controller
              control={control}
              name="fullName"
              rules={{
                required: 'El nombre completo es obligatorio',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Ej: Juan Pérez"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  aria-labelledby="fullName"
                  aria-errormessage="fullNameError"
                />
              )}
            />
            {errors.fullName && (
              <Text className="text-sm text-destructive" nativeID="fullNameError">
                {errors.fullName.message}
              </Text>
            )}
          </View>

          {/* Correo Electrónico */}
          <View className="gap-2">
            <Label nativeID="email">Correo Electrónico de tu Cuenta</Label>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="tucorreo@ejemplo.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  aria-labelledby="email"
                  aria-errormessage="emailError"
                />
              )}
            />
            {errors.email && (
              <Text className="text-sm text-destructive" nativeID="emailError">
                {errors.email.message}
              </Text>
            )}
          </View>

          {/* Teléfono */}
          <View className="gap-2">
            <Label nativeID="phone">Teléfono de Contacto</Label>
            <Controller
              control={control}
              name="phone"
              rules={{
                required: 'El teléfono es obligatorio',
                pattern: {
                  value: /^[0-9\s\-()]+$/,
                  message: 'Teléfono inválido',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Ej: 444 123 4567"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  aria-labelledby="phone"
                  aria-errormessage="phoneError"
                />
              )}
            />
            {errors.phone && (
              <Text className="text-sm text-destructive" nativeID="phoneError">
                {errors.phone.message}
              </Text>
            )}
          </View>

          {/* Detalles */}
          <View className="gap-2">
            <Label nativeID="details">Detalles de la Solicitud</Label>
            <Controller
              control={control}
              name="details"
              rules={{
                required: 'Por favor confirma que deseas eliminar tu cuenta',
                minLength: {
                  value: 10,
                  message: 'Por favor proporciona más detalles',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Por favor, confirma que deseas eliminar permanentemente tu información de Lorman. Puedes añadir cualquier detalle adicional aquí."
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={4}
                  style={{ height: 100, textAlignVertical: 'top' }}
                  aria-labelledby="details"
                  aria-errormessage="detailsError"
                />
              )}
            />
            {errors.details && (
              <Text className="text-sm text-destructive" nativeID="detailsError">
                {errors.details.message}
              </Text>
            )}
          </View>

          {/* Botón de Envío */}
          <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting} className="w-full">
            <Text>{isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}</Text>
          </Button>

          {/* Texto Informativo */}
          <Text className="text-center text-xs text-muted-foreground">
            Una vez enviada, procesaremos tu solicitud en un plazo de 5 a 10 días hábiles. Es
            posible que te contactemos para verificar tu identidad. Este proceso es irreversible y
            resultará en la eliminación de tu historial de pedidos y datos de cuenta.
          </Text>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
