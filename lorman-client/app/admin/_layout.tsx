// app/(admin)/_layout.tsx
import AdminSidebar from '@/components/custom/admin/Sidebar';
import AdminHeader from '@/components/custom/admin/header';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminLayout = () => {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    // Aquí va tu lógica de logout y navegación
  };

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    // Aquí puedes agregar navegación si usas rutas diferentes
    console.log('Navegando a:', section);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 flex-row">
        {/* Sidebar */}
        <AdminSidebar
          selectedSection={selectedSection}
          onSectionChange={handleSectionChange}
        />

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