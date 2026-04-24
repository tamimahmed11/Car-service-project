"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const addToCart = (service) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === service._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === service._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (serviceId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== serviceId)
    );
  };

  const updateQuantity = (serviceId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === serviceId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
