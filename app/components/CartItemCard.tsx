"use client";

import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/app/context/CartContext";
import { FaTrashAlt } from "react-icons/fa";

type CartItem = {
  id: number;
  qnt: number;
};

type ItemData = {
  id: number;
  name: string;
  img: string;
  price: number;
};

export default function CartItemCard({ item }: { item: CartItem }) {
  const [data, setData] = useState<ItemData | null>(null);
  const { removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`http://localhost:4006/items/${item.id}`);
      const result = await res.json();
      setData(result);
    };

    fetchItem();
  }, [item.id]);

  if (!data) return null;

  const totalPrice = data.price * item.qnt;

  return (
    <div className="relative flex flex-col sm:flex-row gap-4 rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 md:p-5 shadow-sm sm:shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300">
      
      <div className="relative w-full sm:w-32 md:w-28">
        <img
          src={data.img}
          alt={data.name}
          className="w-full h-48 sm:h-32 md:h-28 rounded-xl sm:rounded-2xl object-cover"
        />
        <span className="absolute -top-2 -right-2 bg-[#EC003F] text-white text-xs px-2 py-1 rounded-full shadow">
          × {item.qnt}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">
            {data.name}
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <p className="text-xs sm:text-sm text-gray-500">
              قیمت واحد:{" "}
              <span className="font-medium text-gray-700">
                {data.price.toLocaleString()} تومان
              </span>
            </p>
            
            <div className="sm:hidden flex items-center gap-2 text-xs">
              <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                تعداد: {item.qnt}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 sm:mt-3 gap-3 sm:gap-0">
          <div className="flex items-center justify-between sm:block">
            <span className="text-lg sm:text-xl font-extrabold text-[#EC003F]">
              {totalPrice.toLocaleString()} تومان
            </span>
            
            <p className="text-xs text-gray-500 sm:hidden">
              قیمت کل
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <button
              onClick={() => removeFromCart(item.id)}
              className="w-10 h-10 bg-[#EC003F] text-white rounded-lg hover:bg-[#c70036] transition flex items-center justify-center active:scale-95"
              aria-label={`حذف ${data.name} از سبد خرید`}
            >
              <FaTrashAlt size={16} />
            </button>
            
            
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-0 h-full w-1.5 sm:w-3 rounded-l-xl sm:rounded-l-3xl bg-[#EC003F]" />
      
      <div className="absolute bottom-0 left-4 right-4 bg-gray-100 sm:hidden" />
    </div>
  );
}