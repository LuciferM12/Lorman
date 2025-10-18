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
    <View className="rounded-lg bg-white p-4 shadow-lg shadow-gray-300/50">
      <Text className="mb-1 text-sm font-semibold text-blue-500">Paso {step}</Text>
      <Text className="mb-2 text-lg font-bold text-gray-800">{title}</Text>
      <Text className="text-base text-gray-600">{description}</Text>
    </View>
  );
};

export default ProcessStepCard;
