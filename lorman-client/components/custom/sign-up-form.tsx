import React from 'react';
import { View, type TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { COLORS } from '../../constants/colors';
import { registerSchema, RegisterType } from '@/interfaces/IRegister';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message'; 

interface SignInFormProps {
  handleRegister: (data: RegisterType) => Promise<unknown>;
}

export function SignUpForm({ handleRegister }: SignInFormProps) {
  const phoneInputRef = React.useRef<TextInput>(null);
  const emailInputRef = React.useRef<TextInput>(null);
  const passwordInputRef = React.useRef<TextInput>(null);
  const confirmPasswordInputRef = React.useRef<TextInput>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterType>({
    defaultValues: {
      nombre: '',
      telefono: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterType) => {
    try {
      const valid = registerSchema.safeParse(data);
      if (!valid.success) {
        console.error('Errores de validación:', valid.error.format());

        const firstError = valid.error.errors[0]?.message || 'Datos inválidos.';
        Toast.show({
          type: 'error',
          text1: 'Error en el formulario',
          text2: firstError,
        });
        return;
      }

      const result = await handleRegister(data);

      Toast.show({
        type: 'success',
        text1: '¡Registro exitoso!',
        text2: 'Tu cuenta ha sido creada.',
      });

      router.navigate('/');
    } catch (error: any) {
      console.error('Error during registration:', error);

      Toast.show({
        type: 'error',
        text1: 'Error en el registro',
        text2: error.message || 'Ocurrió un error inesperado.',
      });
    }
  };

  const password = watch('password');

  return (
    <View className="gap-6">
      <Card
        className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5"
        style={{ width: 700, alignSelf: 'center' }}>
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Registrarse</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Ingresa tus datos para crear una cuenta.
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <View style={{ flexDirection: 'row', gap: 24 }}>
            <View style={{ flex: 1, gap: 12 }}>
              <View className="gap-1.5">
                <Label htmlFor="nombre">Nombre completo</Label>
                <Controller
                  control={control}
                  name="nombre"
                  rules={{
                    required: 'El nombre completo es obligatorio',
                    minLength: { value: 3, message: 'Nombre demasiado corto' },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      id="fullName" // Corregido: 'id' en lugar de 'htmlFor'
                      placeholder="Tu nombre"
                      autoCapitalize="words"
                      returnKeyType="next"
                      onSubmitEditing={() => phoneInputRef.current?.focus()}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.nombre && (
                  <Text className="mt-1 text-sm text-red-500">{errors.nombre.message}</Text>
                )}
              </View>

              <View className="gap-1.5">
                <Label htmlFor="telefono">Teléfono</Label>
                <Controller
                  control={control}
                  name="telefono"
                  rules={{
                    required: 'El teléfono es obligatorio',
                    pattern: {
                      value: /^[0-9\s\-()]{10,}$/,
                      message: 'Número inválido (mínimo 10 dígitos)',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      ref={phoneInputRef}
                      id="telefono"
                      placeholder="Tu teléfono"
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      onSubmitEditing={() => emailInputRef.current?.focus()}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.telefono && (
                  <Text className="mt-1 text-sm text-red-500">{errors.telefono.message}</Text>
                )}
              </View>

              <View className="gap-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: 'La contraseña es obligatoria',
                    minLength: {
                      value: 6,
                      message: 'Debe tener al menos 6 caracteres',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      ref={passwordInputRef}
                      id="password"
                      placeholder="Contraseña"
                      secureTextEntry
                      returnKeyType="next"
                      onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.password && (
                  <Text className="mt-1 text-sm text-red-500">{errors.password.message}</Text>
                )}
              </View>
            </View>

            <View style={{ flex: 1, gap: 12 }}>
              <View className="gap-1.5">
                <Label htmlFor="email">Correo electrónico</Label>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: 'El correo es obligatorio',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Correo inválido',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      ref={emailInputRef}
                      id="email"
                      placeholder="ejemplo@correo.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
                      onSubmitEditing={() => passwordInputRef.current?.focus()}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.email && (
                  <Text className="mt-1 text-sm text-red-500">{errors.email.message}</Text>
                )}
              </View>

              <View className="gap-1.5">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: 'Debes confirmar tu contraseña',
                    validate: (value) => value === password || 'Las contraseñas no coinciden',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      ref={confirmPasswordInputRef}
                      id="confirmPassword"
                      placeholder="Repite tu contraseña"
                      secureTextEntry
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(onSubmit)}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Text className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <Button
            className="mt-6 w-full"
            style={{ backgroundColor: COLORS.primaryDark }}
            onPress={handleSubmit(onSubmit)}>
            <Text className="text-white">Registrar</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
