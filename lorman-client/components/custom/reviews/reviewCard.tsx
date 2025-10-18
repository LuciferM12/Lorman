import { View, Text } from 'react-native';
import { Star } from 'lucide-react-native';

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export function ReviewCard({ name, rating, comment, date }: ReviewCardProps) {
  return (
    <View className="mb-4 rounded-lg border border-border bg-card p-4">
      <View className="mb-2 flex-row items-start justify-between">
        <Text className="text-lg font-semibold text-foreground">{name}</Text>
        <Text className="text-sm text-muted-foreground">{date}</Text>
      </View>

      <View className="mb-3 flex-row gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? '#facc15' : 'transparent'}
            color={i < rating ? '#facc15' : '#d1d5db'}
          />
        ))}
      </View>

      <Text className="leading-relaxed text-foreground">{comment}</Text>
    </View>
  );
}
