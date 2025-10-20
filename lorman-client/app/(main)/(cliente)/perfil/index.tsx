import { Separator } from '@/components/ui/separator';
import React from 'react';
import { Text, View } from 'react-native';
import Banner from '@/components/custom/banner/banner';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import LormanFooter from '@/components/custom/Footer';
import { ProfileCard } from '@/components/custom/profile/ProfileForm';


const politicas = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <View className="flex-1 bg-white">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Banner
          size="small"
          title="Mi perfil"
          subtitle="Consulta y gestiona tu información personal."
          buttonText="Inicio"
          imageSource={require('@/assets/images/agua.jpg')}
          scrollOffset={scrollOffset}
          onButtonPress={() => {
            console.log('Navegando a productos...');
          }}
        />

        <View className="flex items-center justify-center p-4 py-12">
          <ProfileCard />
        </View>

        <LormanFooter />
      </Animated.ScrollView>
    </View>
  );
};

export default politicas;
