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
  codigo: string;
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
      codigo: '',
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
                  placeholder="Ej: Combo Familiar"
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
            <Label nativeID="codigo">Código promocional</Label>
            <Controller
              control={control}
              name="codigo"
              rules={{
                required: 'El código es obligatorio',
                pattern: {
                  value: /^[A-Z0-9]+$/,
                  message: 'Solo letras mayúsculas y números',
                },
                minLength: {
                  value: 4,
                  message: 'Mínimo 4 caracteres',
                },
                maxLength: {
                  value: 15,
                  message: 'Máximo 15 caracteres',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Ej: FAMILIA2024"
                  value={value}
                  onChangeText={(text) => onChange(text.toUpperCase())}
                  onBlur={onBlur}
                  autoCapitalize="characters"
                  aria-labelledby="codigo"
                />
              )}
            />
            {errors.codigo && (
              <Text className="text-sm text-destructive">{errors.codigo.message}</Text>
            )}
          </View>
        </View>

        <View className="gap-2">
          <Label nativeID="descripcion">Descripción de la promoción</Label>
          <Controller
            control={control}
            name="descripcion"
            rules={{
              required: 'La descripción es obligatoria',
              minLength: {
                value: 10,
                message: 'Mínimo 10 caracteres',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Ej: Llévate 2 garrafones de 20L y te regalamos una bolsa de hielo"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={3}
                style={{ height: 80, textAlignVertical: 'top' }}
                aria-labelledby="descripcion"
              />
            )}
          />
          {errors.descripcion && (
            <Text className="text-sm text-destructive">{errors.descripcion.message}</Text>
          )}
        </View>

        <Button onPress={handleSubmit(handleFormSubmit)} className="self-start bg-green-600">
          <Text className="font-semibold text-white">Agregar Promoción</Text>
        </Button>
      </View>
    </View>
  );
}