import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, type TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { COLORS } from '../constants/colors';

type SignInData = {
  email: string;
  password: string;
};

export function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInData) => {
    console.log('Datos del inicio de sesión:', data);
    // TODO: Submit form and navigate to protected screen if successful
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Inicio de sesión</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Bienvenido! Inicia sesión para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            
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
                    id="email"
                    placeholder="mm@ejemplo.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>
              )}
            </View>

            
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Contraseña</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                  onPress={() => {
                    // TODO: Navigate to forgot password screen
                  }}>
                  <Text className="font-normal leading-4">¿Olvidaste tu contraseña?</Text>
                </Button>
              </View>
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
                    placeholder="Tu contraseña"
                    secureTextEntry
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(onSubmit)}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>
              )}
            </View>

            <Button 
              className="w-full" 
              style={{ backgroundColor: COLORS.primaryDark }} 
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-white">Ingresar</Text>
            </Button>
          </View>

          <Text className="text-center text-sm">
            ¿No tienes cuenta?{' '}
            <Pressable
              onPress={() => {
                // TODO: Navigate to sign up screen
              }}>
              <Text className="text-sm underline underline-offset-4">Registrarse</Text>
            </Pressable>
          </Text>
        </CardContent>
      </Card>
    </View>
  );
}