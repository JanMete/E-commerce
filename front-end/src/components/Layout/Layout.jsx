import { Outlet } from 'react-router-dom';
import { CURRENCIES } from '../../constants/currencies';
import { CartContext } from '../../contexts/CartContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CategoryMenu } from '../CategoryMenu/CategoryMenu';
import { CurrencySelector } from '../CurrencySelector/CurrencySelector';
import { Footer } from '../Footer/Footer';
import { IconMenu } from '../IconMenu/IconMenu';
import { Logo } from '../Logo/Logo';
import { MainContent } from '../MainContent/MainContent';
import { MainMenu } from '../MainMenu/MainMenu';
import { TopBar } from '../TopBar/TopBar';

export function Layout() {
  const [currency, setCurrency] = useLocalStorage(
    'selected_currency',
    CURRENCIES.PLN
  );

  const [cartItems, setCartItems] = useLocalStorage('cart_products', []);

  function addProductToCart(product) {
    setCartItems((prevItems) => {
      const newState = [...prevItems, product];
      return newState;
    });
  }

  function removeProductFromCart(product) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  }

  return (
    <>
      <CartContext.Provider
        value={[cartItems, addProductToCart, removeProductFromCart]}
      >
        <CurrencyContext.Provider value={[currency, setCurrency]}>
          <MainContent>
            <TopBar>
              <MainMenu />
              <Logo />
              <div>
                <CurrencySelector />
                <IconMenu />
              </div>
            </TopBar>
            <CategoryMenu />
            <Outlet />
          </MainContent>
          <Footer />
        </CurrencyContext.Provider>
      </CartContext.Provider>
    </>
  );
}
