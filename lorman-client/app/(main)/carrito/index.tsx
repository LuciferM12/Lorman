import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import CartProductsList from '@/components/custom/cart/cartProductList';
import CartSummary from '@/components/custom/cart/cartSummary';
import LormanFooter from '@/components/custom/Footer';
import { CarDetailWithIdDTO, CartItem } from '@/interfaces/ICart';
import { createCheckoutSession, getCartDetails, removeCartItem, updateCartItemQuantity } from '@/api/cart';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function ShoppingCartScreen() {
  const router = useRouter();
  const { user } = useAuth();
  //const shippingCost = 15.0;
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

  // Calcular subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const total = subtotal;

  // Incrementar cantidad
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

  // Decrementar cantidad
  const decrementQuantity = async (id_producto: number, id_detalle_carrito: number) => {
    const item = cartItems.find(
      (i) => i.id === id_producto && i.id_detalle_carrito === id_detalle_carrito
    );
    const newQuantity = item ? item.cantidad - 1 : 0;
    try {
      await updateCartItemQuantity(id_detalle_carrito, newQuantity);
      await fetchCartDetails();
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar item
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

  const handleCheckout = async () => {
    const response = await createCheckoutSession(cartItems, user?.email || '');
    response.url && router.push(response.url);
  };

  const handleContinueShopping = () => {
    console.log('Continuar comprando...');
    // Navegar de regreso a la tienda
  };

  return (
    <ScrollView className="mt-20 flex-1 bg-gray-50">
      <View className="p-6">
        {/* Título */}
        <Text className="mb-6 text-3xl font-bold text-[#0d4682]">Carrito de Compras</Text>

        <View className="gap-6 md:flex-row md:items-start">
          {/* Columna Izquierda - Productos */}
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

          {/* Columna Derecha - Resumen */}
          <View className="w-full md:w-80">
            <CartSummary
              subtotal={subtotal}
              //shippingCost={shippingCost}
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
