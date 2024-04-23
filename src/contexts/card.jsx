import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CardProvider = ({ children }) => {
  // =========================== copy logic from useCart.jsx ===========================
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItemString = window.localStorage.getItem('cartItems');
    const cart = cartItemString ? JSON.parse(cartItemString) : [];
    // console.log('cartString ====> ', cartItemString, '  || cartJson ====> ', cart);
    setCartItems(cart);
  }, []);

  const addCartItem = (product, quantity) => {
    const matchingCartItem = cartItems.find((cartItem) => cartItem.product.id === product.id);
    // matchingCartItem? matchingCartItem.quantity += quantity : cartItems.push({ product, quantity })
    if (matchingCartItem) {
      matchingCartItem.quantity += quantity;
      //   console.log(cartItems);
    } else {
      cartItems.push({ product, quantity });
    }
    // console.log(cartItems)
    // const newCartItem = [...cartItems, { product, quantity }];
    setCartItems([...cartItems]);
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const removeCartItem = (productId) => {
    const newCartItem = cartItems.filter((cartItem) => cartItem.product.id != productId);
    setCartItems(newCartItem);
    window.localStorage.setItem('cartItems', JSON.stringify(newCartItem));
  };

  const updateQuantity = (productId, quantity) => {
    const matchingCartItem = cartItems.find((cartItem) => cartItem.product.id === productId);
    if (!matchingCartItem) {
      return;
    }
    matchingCartItem.quantity = quantity;
    setCartItems([...cartItems]);
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const validForCheckout = cartItems.every((cartItem) => cartItem.quantity % 1 === 0 && cartItem.quantity > 0);

  const checkout = () => {
    setCartItems([]);
    window.localStorage.setItem('cartItems', JSON.stringify([]));
  };

  return (
    // =========================== and then copy return value in useCard.jsx to value in <CartContext.Provider> ===========================
    <CartContext.Provider
      value={{ cartItems, addCartItem, removeCartItem, updateQuantity, checkout, validForCheckout }}
    >
      {children}
    </CartContext.Provider>
  );
};
