import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
  badge: string;
}

const Promotions: React.FC = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // ---------------------------
  //  Datos base (tu fuente real)
  // ---------------------------
  const promotionsBase: Promotion[] = [
    {
      id: '1',
      title: 'Combo Familiar',
      subtitle: '¡Combo Familiar!',
      description:
        'Llévate 2 garrafones de 20L y te regalamos una bolsa de hielo. ¡Perfecto para la familia!',
      bgColor: '#2B9FD9',
      badge: 'COMBO',
    },
    {
      id: '2',
      title: 'Cliente Nuevo',
      subtitle: 'Descuento de Bienvenida',
      description:
        '¿Eres cliente nuevo? Recibe un 20% de descuento en tu primer pedido. ¡Pruébanos!',
      bgColor: '#1E3A5F',
      badge: '20% OFF',
    },
    {
      id: '3',
      title: 'Fiesta',
      subtitle: '¡Prepara la Fiesta!',
      description: 'En la compra de 3 bolsas de hielo llévate la cuarta ¡totalmente GRATIS!',
      bgColor: '#A8D8F0',
      badge: 'GRATIS',
    },
  ];

  const promotionsData = [...promotionsBase, ...promotionsBase, ...promotionsBase];

  // ---------------------------
  //  Layout y constantes
  // ---------------------------
  const maxWidth = 1920;
  const constrainedWidth = Math.min(screenWidth, maxWidth);
  const itemWidth = Math.min(constrainedWidth - 64, 350);
  const itemHeight = Math.max(180, screenHeight * 0.45);
  const itemMarginHorizontal = 12;
  const snapDistance = itemWidth + itemMarginHorizontal * 2;

  // ---------------------------
  //  Refs y estado
  // ---------------------------
  const flatListRef = useRef<FlatList<Promotion> | null>(null);
  const currentIndexRef = useRef<number>(0);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0); // indicador (0..promotionsBase.length-1)

  const getItemLayout = (data: ArrayLike<Promotion> | null | undefined, index: number) => ({
    length: snapDistance,
    offset: index * snapDistance,
    index,
  });

  // ---------------------------
  //  Inicializar en bloque del medio + autoplay
  // ---------------------------
  useEffect(() => {
    // Start in the middle block so user can scroll both directions
    const middleIndex = promotionsBase.length;
    flatListRef.current?.scrollToOffset({ offset: middleIndex * snapDistance, animated: false });
    currentIndexRef.current = middleIndex;
    setActiveIndex(middleIndex % promotionsBase.length);

    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    autoplayIntervalRef.current = setInterval(() => {
      const next = currentIndexRef.current + 1;
      const total = promotionsData.length;
      const baseLen = promotionsBase.length;

      // Si llegamos al final del bloque derecho, saltamos al bloque del medio
      if (next >= total - baseLen) {
        // Primero hacemos scroll animado al siguiente
        flatListRef.current?.scrollToOffset({ offset: next * snapDistance, animated: true });
        // Después de la animación, saltamos sin animación al bloque del medio
        setTimeout(() => {
          const jumpTo = next - baseLen;
          flatListRef.current?.scrollToOffset({ offset: jumpTo * snapDistance, animated: false });
          currentIndexRef.current = jumpTo;
          setActiveIndex(jumpTo % baseLen);
        }, 300); // Tiempo de la animación
      } else {
        flatListRef.current?.scrollToOffset({ offset: next * snapDistance, animated: true });
        currentIndexRef.current = next;
        setActiveIndex(next % baseLen);
      }
    }, 4000);

    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
    // recalcula si cambia snapDistance o la cantidad base
  }, [snapDistance, promotionsBase.length]);

  // ---------------------------
  //  Manejo del final/inicio para loop suave
  // ---------------------------
  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    let index = Math.round(offsetX / snapDistance);
    const total = promotionsData.length;
    const baseLen = promotionsBase.length;

    // Si llegamos muy al principio del array (bloque izquierdo), saltamos al bloque del medio
    if (index < baseLen) {
      index = index + baseLen;
      flatListRef.current?.scrollToOffset({ offset: index * snapDistance, animated: false });
    }
    // Si llegamos muy al final (bloque derecho), saltamos al bloque del medio
    else if (index >= total - baseLen) {
      index = index - baseLen;
      flatListRef.current?.scrollToOffset({ offset: index * snapDistance, animated: false });
    }

    currentIndexRef.current = index;
    setActiveIndex(index % baseLen);
  };

  // ---------------------------
  //  Scroll manual por indicadores
  // ---------------------------
  const scrollToBaseIndex = (baseIndex: number) => {
    // Queremos movernos al bloque del medio con ese baseIndex
    const target = promotionsBase.length + baseIndex; // bloque del medio + baseIndex
    flatListRef.current?.scrollToOffset({ offset: target * snapDistance, animated: true });
    currentIndexRef.current = target;
    setActiveIndex(baseIndex);
  };

  // ---------------------------
  //  Render de tarjeta
  // ---------------------------
  const PromotionCard = ({ item }: { item: Promotion }) => (
    <View
      style={{
        width: itemWidth,
        height: itemHeight,
        marginHorizontal: itemMarginHorizontal,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'white',
      }}
      className="shadow">
      {/* Top colored section */}
      <View
        style={{
          backgroundColor: item.bgColor,
          height: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
        {/* Badge in top right corner */}
        <View
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: '#F5A623',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}
          className="shadow">
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 12 }}>{item.badge}</Text>
        </View>

        {/* Main title centered */}
        <Text
          style={{
            fontSize: 32,
            fontWeight: '700',
            color: item.bgColor === '#A8D8F0' ? '#1E3A5F' : 'white',
            textAlign: 'center',
            paddingHorizontal: 20,
          }}>
          {item.title}
        </Text>
      </View>

      {/* Bottom white section */}
      <View
        style={{
          backgroundColor: 'white',
          height: '50%',
          padding: 20,
          justifyContent: 'space-between',
        }}>
        <View>
          {/* Subtitle */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#1E3A5F',
              marginBottom: 8,
            }}>
            {item.subtitle}
          </Text>

          {/* Description */}
          <Text
            style={{
              fontSize: 14,
              color: '#4A5568',
              lineHeight: 20,
              marginBottom: 9,
            }}>
            {constrainedWidth < 600 && item.description.length > 20
              ? `${item.description.substring(0, 20)}...`
              : item.description}
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#2B9FD9',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            alignItems: 'center',
          }}
          className="shadow">
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Ver Oferta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ width: '100%', backgroundColor: '#4A90E2' }}>
      <View
        style={{
          maxWidth,
          alignSelf: 'center',
          width: '100%',
          paddingVertical: 28,
          paddingHorizontal: 16,
          position: 'relative',
        }}>
        <Text className="mb-4 text-center text-4xl font-bold text-white">Promociones Activas</Text>
        <Text className="mb-8 text-center text-xl text-white/75">
          ¡Aprovecha nuestras ofertas especiales y ahorra en tus productos favoritos!
        </Text>

        <FlatList
          ref={flatListRef}
          data={promotionsData}
          keyExtractor={(item, idx) => `${item.id}-${idx}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={snapDistance}
          snapToAlignment="center"
          getItemLayout={getItemLayout}
          onMomentumScrollEnd={onMomentumScrollEnd}
          contentContainerStyle={{
            paddingHorizontal: (screenWidth - itemWidth) / 2,
          }}
          renderItem={({ item }) => <PromotionCard item={item} />}
          initialNumToRender={promotionsBase.length * 2}
        />

        <LinearGradient
          pointerEvents="none"
          colors={['#4A90E2', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 60,
          }}
        />
        <LinearGradient
          pointerEvents="none"
          colors={['transparent', '#4A90E2']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 60,
          }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 14 }}>
          {promotionsBase.map((_, idx) => {
            const isActive = activeIndex % promotionsBase.length === idx;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => scrollToBaseIndex(idx)}
                style={{
                  width: isActive ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 6,
                  backgroundColor: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Promotions;
