import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CardProvider } from './contexts/card';

export const App = () => {
  return (
    <CardProvider>
      <Router>
        <Navbar />

        <Switch>
          <Route path="/products/:productId" exact>
            <ProductDetail />
          </Route>
          <Route path="/my-cart" exact>
            <Cart />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </CardProvider>
  );
};

export default App;
