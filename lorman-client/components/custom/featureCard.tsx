import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface FeatureCardProps {
  iconName: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconName, title, description }) => {
  return (
    <View className="flex-1 items-center px-2">
      <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-blue-600">
        <Feather name={iconName} size={32} color="white" />
      </View>

      <Text className="mb-2 text-center text-4xl font-bold text-gray-800 dark:text-gray-100">
        {title}
      </Text>

      <Text className="text-center text-lg text-gray-600 dark:text-gray-300">{description}</Text>
    </View>
  );
};

export default FeatureCard;
