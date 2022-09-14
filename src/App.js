import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './components/navBar/NavBar';
import ItemListContainer from './components/itemList/ItemListContainer';
import ItemDetailContainer from './components/itemDetail/ItemDetailContainer';
import CartCheckout from './components/cartWidget/CartCheckout';
import CartProvider from './components/context/CartContext';
import OrderProvider from './components/context/OrdersContext';
import FavoriteProvider from './components/context/FavoriteContext';
import Orders from './components/Orders';
import Favorites from './components/Favorites';
import CssBaseline from '@mui/material/CssBaseline';



const App = () => {
  const [dark, setDark] = useState(false);
  const theme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OrderProvider>
        <FavoriteProvider>
          <CartProvider>
            <BrowserRouter>
              <NavBar setDark={() => setDark(!dark)} checked={dark} />
              <Routes>
                <Route path='*' element={<h1>ERROR 404 NOT FOUND</h1>} />
                <Route index element={<ItemListContainer dark={dark} />} />
                <Route path='/category/:name' element={<ItemListContainer />} />
                <Route path='item/:id' element={<ItemDetailContainer />} />
                <Route path='/cart' element={<CartCheckout />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/favorites' element={<Favorites />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </FavoriteProvider>
      </OrderProvider>
    </ThemeProvider>
  );
}

export default App;
