"use client";

import { useState } from "react";

type Order = {
  id: number;
  customer: string;
  total: number;
  status: string;
  date: string;
};

export default function Orders() {
  const orders: Order[] = [
    { id: 1001, customer: "علی رضایی", total: 320000, status: "در حال آماده‌سازی", date: "1403/03/20" },
    { id: 1002, customer: "محمد احمدی", total: 185000, status: "تحویل شده", date: "1403/03/20" },
    { id: 1003, customer: "سارا محمدی", total: 540000, status: "لغو شده", date: "1403/03/19" },
  ];

  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) =>
    order.id.toString().includes(search)
  );

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">سفارشات</h1>

      <input
        type="text"
        placeholder="جستجو بر اساس شماره سفارش..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 mb-6 p-3 rounded-lg border outline-none focus:border-[#EC003F]"
      />

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between"
          >
            <div className="space-y-1">
              <p className="font-semibold">سفارش #{order.id}</p>
              <p className="text-sm text-gray-500">
                {order.customer} • {order.date}
              </p>
              <p className="text-sm">
                وضعیت:{" "}
                <span className="text-[#EC003F] font-medium">
                  {order.status}
                </span>
              </p>
            </div>

            <button
              onClick={() => setSelectedOrder(order)}
              className="bg-[#EC003F] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              جزئیات
            </button>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500">
            سفارشی پیدا نشد 🫤
          </p>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-96 p-6 relative animate-fadeIn">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 left-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              جزئیات سفارش #{selectedOrder.id}
            </h2>

            <div className="space-y-2 text-sm">
              <p>👤 مشتری: {selectedOrder.customer}</p>
              <p>📅 تاریخ: {selectedOrder.date}</p>
              <p>📦 وضعیت: {selectedOrder.status}</p>
              <p>💰 مبلغ: {selectedOrder.total.toLocaleString()} تومان</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
