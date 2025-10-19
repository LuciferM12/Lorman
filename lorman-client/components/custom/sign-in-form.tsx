import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, type TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { COLORS } from '../../constants/colors';
import { LoginInput, loginSchema } from '@/interfaces/ILogin';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { SessionUserType, UserType } from '@/interfaces/IUser';

interface SignInFormProps {
  handleLogin: (data: LoginInput) => Promise<SessionUserType>;
}

export function SignInForm({ handleLogin }: SignInFormProps) {
  const passwordInputRef = React.useRef<TextInput>(null);
  const router = useRouter();
  const { loginAuth } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const valid = loginSchema.safeParse(data);
      if (!valid.success) {
        const firstError = valid.error.errors[0]?.message || 'Datos inválidos.';
        Toast.show({
          type: 'error',
          text1: 'Error de validación',
          text2: firstError,
        });
        return;
      }

      const result: SessionUserType = await handleLogin(data);

      await loginAuth(result.user, result.token);

      Toast.show({
        type: 'success',
        text1: '¡Bienvenido!',
        text2: 'Inicio de sesión exitoso.',
      });

      router.navigate('/');
    } catch (error: any) {
      console.error('Error during login:', error);

      Toast.show({
        type: 'error',
        text1: 'Error al iniciar sesión',
        text2: error.message || 'Ocurrió un error inesperado.',
      });
    }
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
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
                <Text className="mt-1 text-sm text-red-500">{errors.email.message}</Text>
              )}
            </View>

            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Contraseña</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="ml-auto h-4 px-1 py-0 web:h-fit sm:h-4"
                  onPress={() => {}}>
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
                <Text className="mt-1 text-sm text-red-500">{errors.password.message}</Text>
              )}
            </View>

            <Button
              className="w-full"
              style={{ backgroundColor: COLORS.primaryDark }}
              onPress={handleSubmit(onSubmit)}>
              <Text className="text-white">Ingresar</Text>
            </Button>
          </View>

          <Text className="text-center text-sm">
            ¿No tienes cuenta?{' '}
            <Link href={'./signUp'}>
              <Pressable onPress={() => {}}>
                <Text className="text-sm underline underline-offset-4">Registrarse</Text>
              </Pressable>
            </Link>
          </Text>
        </CardContent>
      </Card>
    </View>
  );
}
