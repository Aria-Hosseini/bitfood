export default function Header (){
    return(
        <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm fixed top-0 left-0 z-40">
        <div className="text-xl font-bold text-rose-600">BitFood</div>
        <button className="px-4 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition">
          ورود / ثبت‌نام
        </button>
      </header>
    )
}