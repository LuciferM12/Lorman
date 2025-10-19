import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

type PromocionFormData = {
  titulo: string;
  descripcion: string;
};

type PromocionFormProps = {
  onSubmit: (data: PromocionFormData) => void;
};

export default function PromocionForm({ onSubmit }: PromocionFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PromocionFormData>({
    defaultValues: {
      titulo: '',
      descripcion: '',
    },
  });

  const handleFormSubmit = (data: PromocionFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <View className="rounded-lg bg-gray-50 p-4">
      <Text className="mb-3 text-base font-semibold text-gray-800">
        Agregar Nueva Promoción
      </Text>

      <View className="gap-3">
        <View className="flex-row gap-3">
          <View className="flex-1 gap-2">
            <Label nativeID="titulo">Título de la promoción</Label>
            <Controller
              control={control}
              name="titulo"
              rules={{ required: 'El título es obligatorio' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Título de la promoción"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  aria-labelledby="titulo"
                />
              )}
            />
            {errors.titulo && (
              <Text className="text-sm text-destructive">{errors.titulo.message}</Text>
            )}
          </View>

          <View className="flex-1 gap-2">
            <Label nativeID="descripcion">Descripción corta</Label>
            <Controller
              control={control}
              name="descripcion"
              rules={{ required: 'La descripción es obligatoria' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Descripción corta"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  aria-labelledby="descripcion"
                />
              )}
            />
            {errors.descripcion && (
              <Text className="text-sm text-destructive">{errors.descripcion.message}</Text>
            )}
          </View>
        </View>

        <Button onPress={handleSubmit(handleFormSubmit)} className="self-start bg-green-600">
          <Text className="font-semibold text-white">Agregar Promoción</Text>
        </Button>
      </View>
    </View>
  );
}