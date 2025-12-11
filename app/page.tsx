export default function Home() {
  return (
    <div className="min-h-screen w-full bg-zinc-50">
      
      <section className="pt-32 pb-16 px-6 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 mb-4 leading-tight">
          سفارش آنلاین غذا <br /> سریع، راحت و خوشمزه 🍕🔥
        </h1>

        <p className="text-zinc-600 text-sm md:text-base max-w-md">
          از بین صدها رستوران اطراف شما انتخاب کنید و با چند کلیک سفارش بدید.
        </p>

        <div className="mt-6 w-full max-w-lg flex bg-white shadow-md rounded-2xl p-2 border">
          <input
            type="text"
            placeholder="چی میل داری؟ پیتزا، برگر، نوشیدنی..."
            className="flex-1 px-4 py-2 focus:outline-none text-zinc-700"
          />
          <button className="px-4 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition">
            جستجو
          </button>
        </div>
      </section>

      <section className="px-6 my-10">
        <h2 className="text-xl font-semibold text-zinc-800 mb-4">دسته‌بندی‌ها</h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {[
            "پیتزا",
            "برگر",
            "ساندویچ",
            "نوشیدنی",
            "دریایی",
            "کباب",
          ].map((cat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center bg-white shadow rounded-xl p-4 hover:shadow-md transition cursor-pointer"
            >
              <div className="w-12 h-12 bg-rose-100 text-rose-600 flex items-center justify-center rounded-full text-xl">
                🍽️
              </div>
              <span className="mt-2 text-sm text-zinc-700">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 my-10">
        <h2 className="text-xl font-semibold text-zinc-800 mb-4">ایتم های محبوب</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
        </div>
      </section>

      
    </div>
  );
}
