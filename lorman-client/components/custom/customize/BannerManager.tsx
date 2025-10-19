import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { View, Alert, Image } from 'react-native';
import { Upload, ImageIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

type BannerManagerProps = {
  currentBanner?: string | null;
  onBannerChange?: (imageUri: string) => void;
};

export default function BannerManager({ currentBanner, onBannerChange }: BannerManagerProps) {
  const [bannerImage, setBannerImage] = React.useState<string | null>(currentBanner || null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      setBannerImage(newImageUri);
      onBannerChange?.(newImageUri);
      Alert.alert('Éxito', 'Banner actualizado correctamente');
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Text className="mb-4 text-xl font-bold text-[#0d4682]">Banner Principal</Text>

        <View className="gap-4">
          {/* Vista Previa del Banner */}
          <View className="overflow-hidden rounded-lg border border-gray-200">
            {bannerImage ? (
              <Image
                source={{ uri: bannerImage }}
                style={{ width: '100%', height: 200 }}
                resizeMode="cover"
              />
            ) : (
              <View className="h-48 items-center justify-center bg-[#17a2b8]">
                <ImageIcon size={48} color="#fff" />
                <Text className="mt-2 text-xl font-bold text-white">Banner Actual</Text>
              </View>
            )}
          </View>

          <View>
            <Text className="mb-2 text-sm text-gray-600">
              Sube una nueva imagen para el banner de la página de inicio. Recomendado: 1920x500px.
            </Text>
            <Button onPress={pickImage} className="flex-row gap-2 bg-[#17a2b8]">
              <Upload size={20} color="#fff" />
              <Text className="font-semibold text-white">Cambiar Imagen</Text>
            </Button>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}