import { SignInForm } from '@/components/custom/sign-in-form';
import { ScrollView, View, ImageBackground } from 'react-native';

export default function SignInScreen() {
  return (
    <ImageBackground
      source={require('@/assets/images/bgImage.png')}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="cover"
      className="flex-1 w-full h-full"
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe"
        keyboardDismissMode="interactive">
        <View className="w-full max-w-sm">
          <SignInForm />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}