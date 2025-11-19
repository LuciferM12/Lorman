import React from 'react';
import { View, type TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native';
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
              🛡️ Protegemos tu registro de accesos automatizados
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export function SignUpForm({ handleRegister }: SignInFormProps) {
  const phoneInputRef = React.useRef<TextInput>(null);
  const emailInputRef = React.useRef<TextInput>(null);
  const passwordInputRef = React.useRef<TextInput>(null);
  const confirmPasswordInputRef = React.useRef<TextInput>(null);
  const router = useRouter();

  const [captchaVisible, setCaptchaVisible] = React.useState(false);
  const [captchaVerified, setCaptchaVerified] = React.useState(false);

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>({
    defaultValues: {
      nombre: '',
      telefono: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const performRegister = async () => {
    try {
      const data: RegisterType = getValues();
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

      // Resetear captcha en caso de error
      setCaptchaVerified(false);
    }
  };

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

      // Si ya está verificado, registrar directamente
      if (captchaVerified) {
        await performRegister();
      } else {
        // Mostrar captcha
        setCaptchaVisible(true);
      }
    } catch (error: any) {
      console.error('Error during registration:', error);

      Toast.show({
        type: 'error',
        text1: 'Error en el registro',
        text2: error.message || 'Ocurrió un error inesperado.',
      });
    }
  };

  const handleCaptchaVerify = () => {
    setCaptchaVisible(false);
    setCaptchaVerified(true);
    // Proceder con el registro automáticamente
    performRegister();
  };

  const handleCaptchaCancel = () => {
    setCaptchaVisible(false);
  };

  const password = watch('password');

  return (
    <View className="gap-6">
      <CustomCaptcha
        visible={captchaVisible}
        onVerify={handleCaptchaVerify}
        onCancel={handleCaptchaCancel}
      />

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
                      id="fullName"
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
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}>
            <Text className="text-white">
              {captchaVerified ? 'Registrar' : 'Verificar y registrar'}
            </Text>
          </Button>

          {captchaVerified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓ Verificado</Text>
            </View>
          )}
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