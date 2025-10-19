import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

type FAQFormData = {
  pregunta: string;
  respuesta: string;
};

type FAQFormProps = {
  onSubmit: (data: FAQFormData) => void;
};

export default function FAQForm({ onSubmit }: FAQFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FAQFormData>({
    defaultValues: {
      pregunta: '',
      respuesta: '',
    },
  });

  const handleFormSubmit = (data: FAQFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <View className="rounded-lg bg-gray-50 p-4">
      <Text className="mb-3 text-base font-semibold text-gray-800">Agregar Nueva Pregunta</Text>

      <View className="gap-3">
        <View className="gap-2">
          <Label nativeID="pregunta">Escribe la pregunta</Label>
          <Controller
            control={control}
            name="pregunta"
            rules={{ required: 'La pregunta es obligatoria' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Escribe la pregunta"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                aria-labelledby="pregunta"
              />
            )}
          />
          {errors.pregunta && (
            <Text className="text-sm text-destructive">{errors.pregunta.message}</Text>
          )}
        </View>

        <View className="gap-2">
          <Label nativeID="respuesta">Escribe la respuesta</Label>
          <Controller
            control={control}
            name="respuesta"
            rules={{ required: 'La respuesta es obligatoria' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Escribe la respuesta"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={3}
                style={{ height: 80, textAlignVertical: 'top' }}
                accessibilityLabelledBy="respuesta"
              />
            )}
          />
          {errors.respuesta && (
            <Text className="text-sm text-destructive">{errors.respuesta.message}</Text>
          )}
        </View>

        <Button onPress={handleSubmit(handleFormSubmit)} className="self-start bg-green-600">
          <Text className="font-semibold text-white">Agregar Pregunta</Text>
        </Button>
      </View>
    </View>
  );
}