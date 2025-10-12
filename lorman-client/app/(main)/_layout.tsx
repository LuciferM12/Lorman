import Header from '@/components/custom/Header';
import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainLayout = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default React.memo(MainLayout);
