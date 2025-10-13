// components/ProcessStepCard.js
import React from 'react';
import { View, Text } from 'react-native';

type ProcessStepCardProps = {
  step: number;
  title: string;
  description: string;
};

const ProcessStepCard: React.FC<ProcessStepCardProps> = ({ step, title, description }) => {
  return (
    // La tarjeta con fondo blanco, esquinas redondeadas y sombra
    <View className="bg-white rounded-lg p-4 shadow-lg shadow-gray-300/50">
      <Text className="text-sm font-semibold text-blue-500 mb-1">
        Paso {step}
      </Text>
      <Text className="text-lg font-bold text-gray-800 mb-2">
        {title}
      </Text>
      <Text className="text-base text-gray-600">
        {description}
      </Text>
    </View>
  );
};

export default ProcessStepCard;