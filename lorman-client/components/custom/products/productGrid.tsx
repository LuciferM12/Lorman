import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProductCard, type Product } from './productCard';

const { width } = Dimensions.get('window');
const isWeb = width > 768;

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Garrafón de Agua Purificada',
    description:
      'El agua más pura y fresca en nuestro práctico garrafón de 20 litros. Ideal para el hogar y la oficina.',
    price: '$45 MXN',
    backgroundColor: '#2A9FD8',
  },
  {
    id: 2,
    title: 'Hielo Cristalino en Bolsa',
    description:
      'Perfecto para tus bebidas, fiestas y eventos. Nuestro hielo garantiza máxima duración y pureza.',
    price: '$35 MXN',
    backgroundColor: '#7DC8E8',
  },
  {
    id: 3,
    title: 'Agua Embotellada',
    description:
      'Lleva la frescura de Lorman a donde vayas. Disponibles en presentaciones de 500ml y 1L.',
    price: '$12 MXN',
    backgroundColor: '#E8F4F8',
    textColor: '#003B5C',
  },
];

type ProductGridProps = {
  onProductPress?: (product: Product) => void;
};

export const ProductGrid = ({ onProductPress }: ProductGridProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuestros Productos</Text>
        <Text style={styles.headerSubtitle}>
          Ofrecemos agua purificada y hielo de la más alta calidad, perfectos para tu familia y
          negocio.
        </Text>
      </View>

      <View style={styles.grid}>
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => onProductPress?.(product)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    maxWidth: 800,
    marginBottom: 50,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: isWeb ? 42 : 32,
    fontWeight: 'bold',
    color: '#003B5C',
    marginBottom: 16,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: isWeb ? 18 : 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
  },
  grid: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1200,
  },
});
