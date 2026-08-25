'use client';
import { useMarcheOffrandesMain } from '@/hooks/marcheoffrandes/useMarcheOffrandesMain';
import CartContent from './components/CartContent';
import CartHeader from './components/CartHeader';
import PaymentProgressSection from './components/PaymentProgressSection';
import ProductCard from './components/ProductCard';
import MainContainer from './components/MainContainer';
import ScrollableContent from './components/ScrollableContent';

export default function MarcheOffrandesMain() {
  const {
    cart, cartTotal, monoffre, simulationStep, showPaymentProgress,
    updateQuantity, handleAddToCart, handleSimulatedPayment,
  } = useMarcheOffrandesMain();

  if (showPaymentProgress) {
    return <PaymentProgressSection simulationStep={simulationStep} />;
  }

  const hasCartItems = cart.length > 0;

  return (
    <MainContainer>
      <CartHeader />

      <ScrollableContent>
        {!hasCartItems ? (
          <ProductCard product={monoffre} onAddToCart={handleAddToCart} />
        ) : (
          <CartContent
            cart={cart}
            cartTotal={cartTotal}
            updateQuantity={updateQuantity}
            onPayment={handleSimulatedPayment}
          />
        )}
      </ScrollableContent>
    </MainContainer>
  );
}