import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import Toast from 'react-native-toast-message';

const ClienteLayout = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      Toast.show({
        type: 'error',
        text1: 'Por favor inicia sesión',
        text2: 'Debes iniciar sesión para acceder a esta sección.',
      });
      router.replace('/login');
    }
  }, [loading, isAuthenticated, user]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default React.memo(ClienteLayout);
