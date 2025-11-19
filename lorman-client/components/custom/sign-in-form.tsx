import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, type TextInput, View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { COLORS } from '../../constants/colors';
import { LoginInput, loginSchema } from '@/interfaces/ILogin';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { SessionUserType } from '@/interfaces/IUser';

interface SignInFormProps {
  handleLogin: (data: LoginInput) => Promise<SessionUserType>;
}

// Componente Captcha Casero
const CustomCaptcha = ({ 
  visible, 
  onVerify, 
  onCancel 
}: { 
  visible: boolean; 
  onVerify: () => void; 
  onCancel: () => void;
}) => {
  const [num1] = React.useState(() => Math.floor(Math.random() * 10) + 1);
  const [num2] = React.useState(() => Math.floor(Math.random() * 10) + 1);
  const [userAnswer, setUserAnswer] = React.useState('');
  const correctAnswer = num1 + num2;

  const handleVerify = () => {
    if (parseInt(userAnswer) === correctAnswer) {
      Toast.show({
        type: 'success',
        text1: '✓ Verificación correcta',
        text2: 'Captcha completado exitosamente.',
      });
      onVerify();
    } else {
      Toast.show({
        type: 'error',
        text1: '✗ Respuesta incorrecta',
        text2: 'Por favor intenta de nuevo.',
      });
      setUserAnswer('');
    }
  };

  const handleCancel = () => {
    setUserAnswer('');
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.captchaHeader}>
            <Text style={styles.captchaTitle}>Verificación de seguridad</Text>
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.captchaBody}>
            <Text style={styles.captchaQuestion}>
              ¿Cuánto es {num1} + {num2}?
            </Text>
            
            <Input
              placeholder="Tu respuesta"
              keyboardType="numeric"
              value={userAnswer}
              onChangeText={setUserAnswer}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleVerify}
              style={styles.captchaInput}
            />

            <View style={styles.captchaButtons}>
              <Button
                variant="outline"
                onPress={handleCancel}
                style={styles.cancelButton}>
                <Text>Cancelar</Text>
              </Button>
              
              <Button
                onPress={handleVerify}
                style={[styles.verifyButton, { backgroundColor: COLORS.primaryDark }]}
                disabled={!userAnswer}>
                <Text style={styles.verifyButtonText}>Verificar</Text>
              </Button>
            </View>
          </View>

          <View style={styles.captchaFooter}>
            <Text style={styles.captchaFooterText}>
              🛡️ Protegemos tu cuenta de accesos no autorizados
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export function SignInForm({ handleLogin }: SignInFormProps) {
  const passwordInputRef = React.useRef<TextInput>(null);
  const router = useRouter();
  const { loginAuth } = useAuth();
  const [captchaVisible, setCaptchaVisible] = React.useState(false);
  const [captchaVerified, setCaptchaVerified] = React.useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const performLogin = async () => {
    try {
      const data: LoginInput = getValues();
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
      
      // Resetear captcha en caso de error
      setCaptchaVerified(false);
    }
  };

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

      // Si ya está verificado, hacer login directamente
      if (captchaVerified) {
        await performLogin();
      } else {
        // Mostrar captcha
        setCaptchaVisible(true);
      }
    } catch (error: any) {
      console.error('Error during login:', error);

      Toast.show({
        type: 'error',
        text1: 'Error al iniciar sesión',
        text2: error.message || 'Ocurrió un error inesperado.',
      });
    }
  };

  const handleCaptchaVerify = () => {
    setCaptchaVisible(false);
    setCaptchaVerified(true);
    // Proceder con el login automáticamente
    performLogin();
  };

  const handleCaptchaCancel = () => {
    setCaptchaVisible(false);
  };

  return (
    <View className="gap-6">
      <CustomCaptcha
        visible={captchaVisible}
        onVerify={handleCaptchaVerify}
        onCancel={handleCaptchaCancel}
      />

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
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}>
              <Text className="text-white">
                {captchaVerified ? 'Ingresar' : 'Verificar y continuar'}
              </Text>
            </Button>

            {captchaVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Verificado</Text>
              </View>
            )}
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

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  captchaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  captchaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#6b7280',
  },
  captchaBody: {
    padding: 24,
    gap: 20,
  },
  captchaQuestion: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#374151',
    marginBottom: 8,
  },
  captchaInput: {
    textAlign: 'center',
    fontSize: 18,
  },
  captchaButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
  },
  verifyButton: {
    flex: 1,
  },
  verifyButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  captchaFooter: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  captchaFooterText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  verifiedBadge: {
    backgroundColor: '#d1fae5',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  verifiedText: {
    color: '#065f46',
    fontWeight: '600',
    fontSize: 14,
  },
});