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
  addToCart: (id: number, qnt: number) => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
});

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (id: number, qnt: number = 1) => {
  setCartItems((prev) => {
    const exist = prev.find((item) => item.id === id);

    if (exist) {
      // اگه آیتم از قبل هست، تعدادشو زیاد کن
      return prev.map((item) =>
        item.id === id ? { ...item, qnt: item.qnt + qnt } : item
      );
    } else {
      // اگه نیست یه آیتم جدید با تعداد qnt اضافه کن
      return [...prev, { id, qnt }];
    }
  });
};


  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
