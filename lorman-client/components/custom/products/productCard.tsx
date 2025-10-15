import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isWeb = width > 768;

export type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  backgroundColor: string;
  textColor?: string;
  imageSource?: any;
};

type ProductCardProps = {
  product: Product;
  onPress?: () => void;
};

export const ProductCard = ({ product, onPress }: ProductCardProps) => {
  const isLightCard = product.id === 3;

  return (
    <Pressable
      style={[styles.card, { backgroundColor: product.backgroundColor }]}
      onPress={onPress}
    >
      
      <View style={styles.imageContainer}>
        <Text style={[styles.imageText, isLightCard && { color: product.textColor }]}>
          {product.title.split(' ')[0]}
        </Text>
      </View>

      
      <View style={styles.content}>
        <Text style={[styles.title, isLightCard && { color: product.textColor }]}>
          {product.title}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={[styles.priceLabel, isLightCard && { color: product.textColor }]}>
            Desde
          </Text>
          <Text style={[styles.price, isLightCard && { color: product.textColor }]}>
            {product.price}
          </Text>
        </View>

        <Text
          style={[
            styles.description,
            isLightCard && { color: product.textColor, opacity: 0.8 },
          ]}
        >
          {product.description}
        </Text>
        <Text style={[styles.link, isLightCard && { color: '#2A9FD8' }]}>
          Ver más detalles →
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: isWeb ? 350 : width - 40,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
    gap: 6,
  },
  priceLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    fontWeight: '500',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  imageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 22,
    marginBottom: 16,
    opacity: 0.95,
  },
  link: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});