import { loginUser } from '@/api/users';
import { SignInForm } from '@/components/custom/sign-in-form';
import { ScrollView, View, ImageBackground } from 'react-native';

export default function SignInScreen() {
  return (
    <ImageBackground
      source={{ uri: 'https://res.cloudinary.com/dhvb4jesa/image/upload/bgImage_oc8czn.png' }}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="cover"
      className="h-full w-full flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe"
        keyboardDismissMode="interactive">
        <View className="w-full max-w-sm">
          <SignInForm handleLogin={loginUser} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
