"use client";

import { CartContext } from "@/app/context/CartContext";
import { useContext, useEffect, useState } from "react";

export interface Items {
  id: number;
  name: string;
  price: number;
  img: string;
  category: string;
}

export default function MenuPage() {
  const [items, setItems] = useState<Items[]>([]);
  const [activeCat, setActiveCat] = useState<string>("همه");
  const [openItem, setOpenItem] = useState<Items | null>(null);
  const [count, setCount] = useState<number>(1); // ➜ تعداد

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4006/items");
      const data = await res.json();
      setItems(data);
    };
    fetchData();
  }, []);

  const category = ["همبرگر", "پیتزا", "نوشیدنی", "همه"];

  const filteritems =
    activeCat === "همه"
      ? items
      : items.filter((i) => i.category === activeCat);

  const handleOpen = (item: Items) => {
    setOpenItem(item);
    setCount(1); 
  };

  const {addToCart} = useContext(CartContext)

  return (
    <div className="mt-20 w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#EC003F]">صفحه منو</h1>

      <div className="flex flex-col lg:flex-row items-start justify-center p-4 gap-5 w-full max-w-[1500px]">
        {/* فیلتر */}
        <div className="h-fit w-full lg:w-80 bg-white border border-gray-300 shadow-xl rounded-xl p-5 sticky top-24">
          <h2 className="text-xl font-bold text-[#EC003F] text-center mb-4">
            فیلترها
          </h2>

          <div className="space-x-2 flex items-center justify-center mt-2 flex-wrap gap-2">
            {category.map((item) => (
              <button
                key={item}
                onClick={() => setActiveCat(item)}
                className={`rounded-md text-[15px] py-1 px-5 transition-all
                  ${
                    activeCat === item
                      ? "bg-[#EC003F] text-white shadow-md scale-[1.05]"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <span className="text-gray-700 font-semibold text-[15px]">
              بازه قیمتی
            </span>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-3"></div>
          </div>
        </div>

        {/* کارت محصولات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-225">
          {filteritems.map((i) => (
            <div
              key={i.id}
              onClick={() => handleOpen(i)}
              className="w-full bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:scale-[1.03] transition-all cursor-pointer"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                {i.img ? (
                  <img
                    src={i.img}
                    alt={i.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>

              <div className="p-4">
                <h2 className="text-lg font-bold text-[#EC003F]">{i.name}</h2>

                <p className="text-sm text-gray-500 mt-1">
                  دسته‌بندی: {i.category}
                </p>

                <p className="text-md text-gray-800 font-semibold mt-2">
                  {i.price.toLocaleString()} تومان
                </p>

                <div className="flex justify-between mt-4">
                  <button className="bg-[#EC003F] text-white px-4 py-2 rounded-lg hover:bg-[#c70036] transition-all">
                    سفارش
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* مودال */}
      {openItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-5 relative animate-[fadeIn_.3s_ease]">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              onClick={() => setOpenItem(null)}
            >
              ✖
            </button>

            <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
              {openItem.img ? (
                <img
                  src={openItem.img}
                  alt={openItem.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-bold text-[#EC003F]">
                {openItem.name}
              </h2>

              <p className="text-gray-600 mt-2">
                دسته‌بندی: {openItem.category}
              </p>

              <p className="text-lg font-semibold text-gray-800 mt-2">
                {openItem.price.toLocaleString()} تومان
              </p>

              <div className="mt-5 flex items-center justify-center gap-4">
                <button
                  className="w-10 h-10 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition"
                  onClick={() => setCount((c) => Math.max(1, c - 1))}
                >
                  -
                </button>

                <span className="text-lg font-bold">{count}</span>

                <button
                  className="w-10 h-10 bg-[#EC003F] text-white text-xl rounded-lg hover:bg-[#c70036] transition"
                  onClick={() => setCount((c) => c + 1)}
                >
                  +
                </button>
              </div>

              <button onClick={()=>addToCart(openItem.id , count)} className="mt-5 w-full bg-[#EC003F] text-white py-3 rounded-xl hover:bg-[#c70036] transition">
                سفارش
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
