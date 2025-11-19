import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, ScrollView, Platform, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import CartProductsList from '@/components/custom/cart/cartProductList';
import CartSummary from '@/components/custom/cart/cartSummary';
import LormanFooter from '@/components/custom/Footer';
import { CarDetailWithIdDTO, CartItem } from '@/interfaces/ICart';
import {
  createCheckoutSession,
  createPaymentIntent,
  getCartDetails,
  removeCartItem,
  updateCartItemQuantity,
} from '@/api/cart';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function ShoppingCartScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchCartDetails = async () => {
    if (user) {
      try {
        setLoading(true);
        const cartData = await getCartDetails(user.id_usuario);
        const items: CartItem[] = cartData.map((detail: CarDetailWithIdDTO) => ({
          id: detail.productos.id_producto,
          name: detail.productos.nombre_producto,
          descripcion: detail.productos.descripcion,
          precio: detail.productos.precio_unitario,
          cantidad: detail.cantidad,
          imagen: detail.productos.image || undefined,
          id_detalle_carrito: detail.id_detalle_carrito,
        }));
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    fetchCartDetails();
  }, [user]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const total = subtotal;

  // Función para móviles (Payment Sheet)
  const handleCheckoutMobile = async () => {
    try {
      setLoading(true);

      // 1. Crear Payment Intent
      const { clientSecret, paymentIntentId } = await createPaymentIntent(
        cartItems,
        user?.email || ''
      );

      // 2. Inicializar el Payment Sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'Lorman',
        paymentIntentClientSecret: clientSecret,
        defaultBillingDetails: {
          email: user?.email,
        },
        returnURL: 'tu-app://stripe-redirect', // Importante para deep linking
      });

      if (initError) {
        Alert.alert('Error', initError.message);
        return;
      }

      // 3. Presentar el Payment Sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        Alert.alert('Pago cancelado', presentError.message);
      } else {
        Alert.alert('¡Pago exitoso!', 'Tu pedido ha sido procesado correctamente', [
          {
            text: 'OK',
            onPress: () => router.push('/success'),
          },
        ]);
      }
    } catch (error) {
      console.error('Error en checkout móvil:', error);
      Alert.alert('Error', 'Hubo un problema al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  // Función para web (Checkout Session)
  const handleCheckoutWeb = async () => {
    try {
      setLoading(true);
      const response = await createCheckoutSession(cartItems, user?.email || '');
      if (response.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error('Error en checkout web:', error);
    } finally {
      setLoading(false);
    }
  };

  // Decidir qué función usar según la plataforma
  const handleCheckout = () => {
    if (Platform.OS === 'web') {
      handleCheckoutWeb();
    } else {
      handleCheckoutMobile();
    }
  };

  const incrementQuantity = async (id_producto: number, id_detalle_carrito: number) => {
    const item = cartItems.find(
      (i) => i.id === id_producto && i.id_detalle_carrito === id_detalle_carrito
    );
    const newQuantity = item ? item.cantidad + 1 : 1;
    setLoading(true);
    try {
      await updateCartItemQuantity(id_detalle_carrito, newQuantity);
      await fetchCartDetails();
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const decrementQuantity = async (id_producto: number, id_detalle_carrito: number) => {
    const item = cartItems.find(
      (i) => i.id === id_producto && i.id_detalle_carrito === id_detalle_carrito
    );
    const newQuantity = item ? item.cantidad - 1 : 0;
    setLoading(true);
    try {
      await updateCartItemQuantity(id_detalle_carrito, newQuantity);
      await fetchCartDetails();
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: number) => {
    setLoading(true);
    try {
      await removeCartItem(id);
      await fetchCartDetails();
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    router.push('/'); // O la ruta de tu tienda
  };

  return (
    <ScrollView className="mt-20 flex-1 bg-gray-50" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 p-6">
        <Text className="mb-6 text-3xl font-bold text-[#0d4682]">Carrito de Compras</Text>

        <View className="gap-6 md:flex-row md:items-start">
          <View className="flex-1">
            <CartProductsList
              loading={loading}
              items={cartItems}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
              onRemove={removeItem}
              onContinueShopping={handleContinueShopping}
            />
          </View>

          <View className="w-full md:w-80">
            <CartSummary
              subtotal={subtotal}
              total={total}
              onCheckout={handleCheckout}
              isDisabled={cartItems.length === 0 || loading}
            />
          </View>
        </View>
      </View>
      <LormanFooter />
    </ScrollView>
  );
}
