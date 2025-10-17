import { View, Text } from "react-native"
import { Star } from "lucide-react-native"

interface ReviewCardProps {
  name: string
  rating: number
  comment: string
  date: string
}

export function ReviewCard({ name, rating, comment, date }: ReviewCardProps) {
  return (
    <View className="bg-card p-4 rounded-lg border border-border mb-4">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-semibold text-foreground">{name}</Text>
        <Text className="text-sm text-muted-foreground">{date}</Text>
      </View>

      <View className="flex-row gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? "#facc15" : "transparent"}
            color={i < rating ? "#facc15" : "#d1d5db"}
          />
        ))}
      </View>

      <Text className="text-foreground leading-relaxed">{comment}</Text>
    </View>
  )
}