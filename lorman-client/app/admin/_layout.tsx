import AdminSidebar from '@/components/custom/admin/Sidebar';
import AdminHeader from '@/components/custom/admin/header';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import Toast from 'react-native-toast-message';

const AdminLayout = () => {
  const { user, isAuthenticated, logoutAuth, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logoutAuth();
  };

  useEffect(() => {
    if (!loading && (!isAuthenticated || (user && !user.rol.includes('administrador')))) {
      if (user && user.rol.includes('cliente')) {
        Toast.show({
          type: 'error',
          text1: 'Ups... Acceso denegado',
          text2: 'Parece que no tienes permisos para acceder a esta sección.',
        });
        router.replace('/');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Por favor inicia sesión',
          text2: 'Debes iniciar sesión para acceder a esta sección.',
        });
        router.replace('/login');
      }
    }
  }, [loading, isAuthenticated, user]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 flex-row">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <View className="flex-1">
          {/* Header */}
          <AdminHeader onLogout={handleLogout} />

          {/* Content from Stack screens */}
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(AdminLayout);
