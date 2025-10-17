// components/ReviewForm.tsx
import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Star } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Función placeholder para validar sesión
function checkUserSession(): boolean {
  // TODO: Implementar validación de sesión real
  // Por ahora retorna false para simular que no hay sesión
  return false;
}

export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = () => {
    // Validar sesión
    if (!checkUserSession()) {
      Alert.alert(
        'Sesión requerida',
        'Debes iniciar sesión para dejar una opinión',
        [{ text: 'OK' }]
      );
      return;
    }

    // Validar campos
    if (rating === 0) {
      Alert.alert('Error', 'Por favor selecciona una calificación');
      return;
    }

    if (comment.trim() === '') {
      Alert.alert('Error', 'Por favor escribe un comentario');
      return;
    }

    // Aquí iría la lógica para enviar la reseña
    console.log('[v0] Enviando reseña:', { rating, comment });
    Alert.alert('Éxito', 'Tu opinión ha sido enviada correctamente');
    
    // Limpiar formulario
    setRating(0);
    setComment('');
  };

  return (
    <View className="flex-1 px-4">
      <View className="mb-6">
        <Label nativeID="rating" className="mb-2">
          Calificación
        </Label>
        <View className="flex-row gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              activeOpacity={0.7}
            >
              <Star
                size={32}
                fill={star <= (hoveredStar || rating) ? '#facc15' : 'transparent'}
                color={star <= (hoveredStar || rating) ? '#facc15' : '#d1d5db'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="mb-6">
        <Label nativeID="comment" className="mb-2">
          Comentario
        </Label>
        <Textarea
          placeholder="Escribe tu opinión aquí..."
          value={comment}
          onChangeText={setComment}
          numberOfLines={6}
          className="min-h-[120px]"
          aria-labelledby="comment"
        />
      </View>

      <Button onPress={handleSubmit} className="w-full">
        <Text className="text-primary-foreground font-semibold">
          Enviar Opinión
        </Text>
      </Button>
    </View>
  );
}