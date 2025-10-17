// components/ReviewGrid.tsx
import { ScrollView } from 'react-native';
import { ReviewCard } from './reviewCard';

const mockReviews = [
  {
    id: 1,
    name: "María González",
    rating: 5,
    comment:
      "Excelente servicio, muy recomendado. La atención al cliente fue excepcional y el producto superó mis expectativas.",
    date: "15 Ene 2025",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    rating: 4,
    comment:
      "Muy buena experiencia en general. El único detalle es que tardó un poco más de lo esperado, pero valió la pena.",
    date: "12 Ene 2025",
  },
  {
    id: 3,
    name: "Ana Martínez",
    rating: 5,
    comment: "Increíble calidad y rapidez. Sin duda volveré a comprar. El empaque también fue muy cuidadoso.",
    date: "10 Ene 2025",
  },
  {
    id: 4,
    name: "Luis Fernández",
    rating: 3,
    comment: "Está bien, cumple con lo prometido pero esperaba un poco más por el precio.",
    date: "8 Ene 2025",
  },
  {
    id: 5,
    name: "Patricia Silva",
    rating: 5,
    comment: "Perfecto en todos los aspectos. La mejor compra que he hecho este año.",
    date: "5 Ene 2025",
  },
  {
    id: 6,
    name: "Roberto Díaz",
    rating: 4,
    comment: "Buena relación calidad-precio. El servicio de entrega fue puntual y profesional.",
    date: "3 Ene 2025",
  },
]

export function ReviewGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Todas las Opiniones</h2>
        <p className="text-muted-foreground">
          {mockReviews.length} {mockReviews.length === 1 ? "opinión" : "opiniones"}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockReviews.map((review) => (
          <ReviewCard
            key={review.id}
            name={review.name}
            rating={review.rating}
            comment={review.comment}
            date={review.date}
          />
        ))}
      </div>
    </div>
  )
}
