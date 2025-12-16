"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const todayDate = time.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const todayTime = time.toLocaleTimeString("fa-IR");

  return (
    <div className="w-full h-125">
      <h1 className="text-2xl font-bold mb-6">داشبورد ادمین</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-5 border-r-4 border-[#EC003F]">
          <p className="text-gray-500 text-sm">درآمد امروز</p>
          <h2 className="text-2xl font-bold mt-2 text-[#EC003F]">
            12,500,000 تومان
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-r-4 border-[#EC003F]">
          <p className="text-gray-500 text-sm">سفارشات امروز</p>
          <h2 className="text-2xl font-bold mt-2">23 سفارش</h2>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-r-4 border-[#EC003F]">
          <p className="text-gray-500 text-sm">تاریخ امروز</p>
          <h2 className="text-xl font-semibold mt-2">{todayDate}</h2>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-r-4 border-[#EC003F]">
          <p className="text-gray-500 text-sm">ساعت</p>
          <h2 className="text-xl font-semibold mt-2">{todayTime}</h2>
        </div>
      </div>
    </div>
  );
}
