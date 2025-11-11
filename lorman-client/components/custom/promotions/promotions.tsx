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
  promoCode: string;
}

const Promotions: React.FC = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // ---------------------------
  //  Datos base
  // ---------------------------
  const promotionsBase: Promotion[] = [
    {
      id: '1',
      title: 'Combo Familiar',
      subtitle: '¡Combo Familiar!',
      description:
        'Llévate 2 garrafones de 20L y te regalamos una bolsa de hielo. ¡Perfecto para la familia!',
      bgColor: '#2B9FD9',
      promoCode: 'FAMILIA2024',
    },
    {
      id: '2',
      title: 'Cliente Nuevo',
      subtitle: 'Descuento de Bienvenida',
      description:
        '¿Eres cliente nuevo? Recibe un 20% de descuento en tu primer pedido. ¡Pruébanos!',
      bgColor: '#1E3A5F',
      promoCode: 'NUEVO20',
    },
    {
      id: '3',
      title: 'Fiesta',
      subtitle: '¡Prepara la Fiesta!',
      description: 'En la compra de 3 bolsas de hielo llévate la cuarta ¡totalmente GRATIS!',
      bgColor: '#A8D8F0',
      promoCode: 'HIELO3X4',
    },
  ];

  const promotionsData = [...promotionsBase, ...promotionsBase, ...promotionsBase];

  // ---------------------------
  //  Layout responsivo
  // ---------------------------
  const maxWidth = 1920;
  const constrainedWidth = Math.min(screenWidth, maxWidth);

  // Ancho de tarjeta: 90% del ancho disponible, máximo 380px
  const itemWidth = Math.min(constrainedWidth * 0.9, 380);
  const itemMinHeight = 220; // Altura mínima
  const itemMarginHorizontal = 12;
  const snapDistance = itemWidth + itemMarginHorizontal * 2;

  // Escala de fuente según ancho
  const scale = Math.min(constrainedWidth / 400, 1.2);
  const titleFontSize = 28 * scale;
  const subtitleFontSize = 18 * scale;
  const descFontSize = 14 * scale;
  const buttonFontSize = 15 * scale;

  // ---------------------------
  //  Refs y estado
  // ---------------------------
  const flatListRef = useRef<FlatList<Promotion> | null>(null);
  const currentIndexRef = useRef<number>(0);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const getItemLayout = (data: ArrayLike<Promotion> | null | undefined, index: number) => ({
    length: snapDistance,
    offset: index * snapDistance,
    index,
  });

  // ---------------------------
  //  Inicializar + autoplay
  // ---------------------------
  useEffect(() => {
    const middleIndex = promotionsBase.length;
    flatListRef.current?.scrollToOffset({ offset: middleIndex * snapDistance, animated: false });
    currentIndexRef.current = middleIndex;
    setActiveIndex(middleIndex % promotionsBase.length);

    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);

    autoplayIntervalRef.current = setInterval(() => {
      const next = currentIndexRef.current + 1;
      const total = promotionsData.length;
      const baseLen = promotionsBase.length;

      if (next >= total - baseLen) {
        flatListRef.current?.scrollToOffset({ offset: next * snapDistance, animated: true });
        setTimeout(() => {
          const jumpTo = next - baseLen;
          flatListRef.current?.scrollToOffset({ offset: jumpTo * snapDistance, animated: false });
          currentIndexRef.current = jumpTo;
          setActiveIndex(jumpTo % baseLen);
        }, 300);
      } else {
        flatListRef.current?.scrollToOffset({ offset: next * snapDistance, animated: true });
        currentIndexRef.current = next;
        setActiveIndex(next % baseLen);
      }
    }, 4000);

    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [snapDistance, promotionsBase.length]);

  // ---------------------------
  //  Manejo de scroll
  // ---------------------------
  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    let index = Math.round(offsetX / snapDistance);
    const total = promotionsData.length;
    const baseLen = promotionsBase.length;

    if (index < baseLen) {
      index = index + baseLen;
      flatListRef.current?.scrollToOffset({ offset: index * snapDistance, animated: false });
    } else if (index >= total - baseLen) {
      index = index - baseLen;
      flatListRef.current?.scrollToOffset({ offset: index * snapDistance, animated: false });
    }

    currentIndexRef.current = index;
    setActiveIndex(index % baseLen);
  };

  const scrollToBaseIndex = (baseIndex: number) => {
    const target = promotionsBase.length + baseIndex;
    flatListRef.current?.scrollToOffset({ offset: target * snapDistance, animated: true });
    currentIndexRef.current = target;
    setActiveIndex(baseIndex);
  };

  // ---------------------------
  //  Tarjeta adaptable
  // ---------------------------
  const PromotionCard = ({ item }: { item: Promotion }) => (
    <View
      style={{
        width: itemWidth,
        minHeight: itemMinHeight,
        marginHorizontal: itemMarginHorizontal,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}>
      {/* Sección superior con color */}
      <View
        style={{
          backgroundColor: item.bgColor,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 120,
        }}>
        <Text
          style={{
            fontSize: titleFontSize,
            fontWeight: '700',
            color: item.bgColor === '#A8D8F0' ? '#1E3A5F' : 'white',
            textAlign: 'center',
            marginBottom: 12,
          }}>
          {item.title}
        </Text>

        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 2,
            borderColor: 'white',
            borderStyle: 'dashed',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
          }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: '600',
              color: 'white',
              textAlign: 'center',
              opacity: 0.9,
            }}>
            CÓDIGO PROMOCIONAL
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: 'white',
              textAlign: 'center',
              letterSpacing: 1.5,
            }}>
            {item.promoCode}
          </Text>
        </View>
      </View>

      {/* Sección inferior */}
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              fontSize: subtitleFontSize,
              fontWeight: '700',
              color: '#1E3A5F',
              marginBottom: 8,
            }}>
            {item.subtitle}
          </Text>

          <Text
            style={{
              fontSize: descFontSize,
              color: '#4A5568',
              lineHeight: descFontSize * 1.5,
            }}>
            {item.description}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#2B9FD9',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 3,
          }}>
          <Text style={{ color: 'white', fontWeight: '600', fontSize: buttonFontSize }}>
            Ver Oferta
          </Text>
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
          paddingVertical: 32,
          paddingHorizontal: 16,
        }}>
        <Text className="mb-4 text-center text-4xl font-bold text-white">
          Promociones Activas
        </Text>
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

        {/* Gradientes laterales */}
        <LinearGradient
          pointerEvents="none"
          colors={['#4A90E2', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60 }}
        />
        <LinearGradient
          pointerEvents="none"
          colors={['transparent', '#4A90E2']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60 }}
        />

        {/* Indicadores */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
          {promotionsBase.map((_, idx) => {
            const isActive = activeIndex % promotionsBase.length === idx;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => scrollToBaseIndex(idx)}
                style={{
                  width: isActive ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 6,
                  backgroundColor: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.3s ease',
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