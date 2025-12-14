"use client";

import { createContext, useState } from "react";

type CartContextProviderProps = {
  children: React.ReactNode;
};

type CartItem = {
  id: number;
  qnt: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (id: number, qnt?: number) => void;
  removeFromCart: (id: number) => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (id: number, qnt: number = 1) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === id);

      if (exist) {
        return prev.map((item) =>
          item.id === id ? { ...item, qnt: item.qnt + qnt } : item
        );
      }

      return [...prev, { id, qnt }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
