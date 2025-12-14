"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/app/context/CartContext";
import CartItemCard from "@/app/components/CartItemCard";

type ItemData = {
  id: number;
  price: number;
};

export default function CartPage() {
  const { cartItems } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calcTotal = async () => {
      let sum = 0;

      for (const item of cartItems) {
        const res = await fetch(`http://localhost:4006/items/${item.id}`);
        const data: ItemData = await res.json();
        sum += data.price * item.qnt;
      }

      setTotalPrice(sum);
    };

    if (cartItems.length > 0) {
      calcTotal();
    }
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="mt-20 text-center text-gray-400 text-lg">
        سبد سفارشات خالیه 🛒
      </div>
    );
  }

  return (
    <div className="mt-20 max-w-4xl mx-auto px-4 space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-800">
        سبد سفارشات
      </h1>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="sticky bottom-4 bg-white border border-gray-200 rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">مجموع قابل پرداخت</p>
          <p className="text-2xl font-extrabold text-[#EC003F]">
            {totalPrice.toLocaleString()} تومان
          </p>
        </div>

        <button className="w-full sm:w-auto bg-[#EC003F] text-white px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition">
          ثبت سفارش
        </button>
      </div>
    </div>
  );
}
