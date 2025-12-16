"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-800">
            Admin Login
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            وارد پنل مدیریت شو
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm text-zinc-600 mb-1">
              ایمیل
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-zinc-600 mb-1">
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-red-600 py-2 text-white font-semibold transition hover:bg-red-700 active:scale-[0.98]"
          >
            ورود به پنل
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-zinc-400">
          © 2025 Admin Panel
        </div>
      </div>
    </div>
  );
}
