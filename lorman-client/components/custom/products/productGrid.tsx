import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProductCard, type Product } from './productCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react-native';
import * as React from 'react';

const { width } = Dimensions.get('window');
const isWeb = width > 768;

type ProductGridProps = {
  onProductPress?: (product: Product) => void;
  products: Product[];
};

export const ProductGrid = ({ onProductPress, products }: ProductGridProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filtrar productos por nombre
  const filteredProducts = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }
    
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuestros Productos</Text>
        <Text style={styles.headerSubtitle}>
          Ofrecemos agua purificada y hielo de la más alta calidad, perfectos para tu familia y
          negocio.
        </Text>
      </View>

      {/* Barra de Búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <Input
            placeholder="Buscar productos por nombre..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
        
        {searchQuery && (
          <Text style={styles.resultCount}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
          </Text>
        )}
      </View>

      {/* Grid de Productos */}
      {filteredProducts.length > 0 ? (
        <View style={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={`${product.id}-${product.title}`}
              product={product}
              onPress={() => onProductPress?.(product)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No se encontraron productos con "{searchQuery}"
          </Text>
          <Text style={styles.emptyStateSubtext}>
            Intenta con otro término de búsqueda
          </Text>
        </View>
      )}
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
  searchContainer: {
    width: '100%',
    maxWidth: 600,
    marginBottom: 40,
    gap: 8,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: 16,
  },
  resultCount: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  grid: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1200,
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});