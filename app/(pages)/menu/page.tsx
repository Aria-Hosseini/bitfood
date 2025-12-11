"use client";

import Link from "next/link";
import { useState } from "react";

export default function MenuPage() {
  interface Items {
    id: number;
    name: string;
    price: number;
    img: string;
    category: string;
  }

  const items: Items[] = [
    { id: 1, name: "همبرگر مخصوص", price: 120000, img: "", category: "همبرگر" },
    { id: 2, name: "چیزبرگر", price: 135000, img: "", category: "همبرگر" },
    { id: 3, name: "دوبل برگر", price: 180000, img: "", category: "همبرگر" },
    { id: 4, name: "برگر مرغ", price: 110000, img: "", category: "همبرگر" },
    { id: 5, name: "پیتزا پپرونی", price: 200000, img: "", category: "پیتزا" },
    { id: 6, name: "پیتزا مارگاریتا", price: 170000, img: "", category: "پیتزا" },
    { id: 7, name: "پیتزا سبزیجات", price: 160000, img: "", category: "پیتزا" },
    { id: 8, name: "نوشابه کوکا", price: 25000, img: "", category: "نوشیدنی" },
    { id: 9, name: "نوشابه فانتا", price: 25000, img: "", category: "نوشیدنی" },
    { id: 10, name: "آب معدنی", price: 15000, img: "", category: "نوشیدنی" },
    { id: 11, name: "موهیتو", price: 60000, img: "", category: "نوشیدنی" },
  ];

  const [activeCat, setActiveCat] = useState<string>("همه");

  const category =["همبرگر","پیتزا","نوشیدنی","همه"]

  const filteritems = activeCat === "همه" ? items : items.filter((i)=> i.category === activeCat);

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
            <Link key={i.id} href={`menu/${i.name}`}>
            <div
              key={i.id}
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
            </Link>
          ))}
         
        </div>

      </div>
    </div>
  );
}
