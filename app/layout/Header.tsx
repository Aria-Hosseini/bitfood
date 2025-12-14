"use client";

import Link from "next/link";
import { FiShoppingCart, FiMenu } from "react-icons/fi";
import { CartContext } from "@/app/context/CartContext";
import { useContext } from "react";

export default function Header() {
  const { cartItems } = useContext(CartContext);

  const totalCount = cartItems.reduce((acc, item) => acc + item.qnt, 0);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm fixed top-0 left-0 z-40">
      <Link href="/">
        <div className="text-xl font-bold text-rose-600 cursor-pointer">
          BitFood
        </div>
      </Link>

      <div className="flex items-center ml-8 gap-3">
        <Link href="/menu">
          <button className="flex items-center gap-2 p-2 rounded-xl border border-gray-200 text-gray-600 hover:text-[#EC003F] hover:border-[#EC003F] transition">
            <span>مشاهده منو</span>
            <FiMenu size={22} />
          </button>
        </Link>

        <Link href="/cart">
          <button className="relative p-2 rounded-xl bg-[#EC003F] text-white hover:opacity-90 transition">
            <FiShoppingCart size={22} />

            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-[#EC003F] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalCount}
              </span>
            )}
          </button>
        </Link>
      </div>
    </header>
  );
}
