import Header from '@/components/custom/Header';
import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';

const MainLayout = () => {
  return (
    <View className="flex h-full w-full flex-col">
      <Header />
      <View className="flex-1 pt-20">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
};

export default React.memo(MainLayout);
