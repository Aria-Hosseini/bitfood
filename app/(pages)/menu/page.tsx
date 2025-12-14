"use client";

import { CartContext } from "@/app/context/CartContext";
import { useContext, useEffect, useState, useRef } from "react";
import { FaTrashAlt, FaFilter, FaChevronUp, FaChevronDown } from "react-icons/fa";

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
  const [count, setCount] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [filterVisible, setFilterVisible] = useState<boolean>(true);

  const filterRef = useRef<HTMLDivElement>(null);

  // تشخیص دستگاه موبایل
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowMobileFilter(false);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // کنترل اسکرول برای مخفی/نمایش فیلتر در موبایل
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // اگر کاربر به سمت پایین اسکرول کند، فیلتر را مخفی کن
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setFilterVisible(false);
      } 
      // اگر کاربر به سمت بالا اسکرول کند، فیلتر را نشان بده
      else if (currentScrollY < lastScrollY) {
        setFilterVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, lastScrollY]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4006/items");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchData();
  }, []);

  const category = ["همبرگر", "پیتزا", "نوشیدنی", "همه"];

  const filteritems =
    activeCat === "همه" ? items : items.filter((i) => i.category === activeCat);

  const handleOpen = (item: Items) => {
    setOpenItem(item);
    setCount(1);
  };

  const { addToCart, removeFromCart } = useContext(CartContext);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpenItem(null);
    }
  };

  const handleContentClick = () => {
    if (isMobile && showMobileFilter) {
      setShowMobileFilter(false);
    }
  };

  return (
    <div className="mt-16 md:mt-20 w-full flex flex-col items-center px-3 md:px-4 relative">
      <h1 className="text-2xl md:text-3xl font-bold text-[#EC003F] text-center mt-5 mb-4 md:mb-6">
        صفحه منو
      </h1>

      {isMobile && (
        <div 
          className={`fixed top-20 right-4 z-30 transition-all duration-300 ${
            filterVisible ? 'translate-y-0 opacity-100' : ' opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="bg-[#EC003F] text-white p-3 rounded-full shadow-lg flex items-center justify-center hover:bg-[#c70036] transition-all active:scale-95"
            aria-label="نمایش/مخفی کردن فیلترها"
          >
            {showMobileFilter ? <FaChevronUp size={20} /> : <FaFilter size={20} />}
          </button>
        </div>
      )}

      {isMobile && showMobileFilter && (
        <div 
          ref={filterRef}
          className="fixed top-24 right-4 left-4 z-30 bg-white border border-gray-300 shadow-2xl rounded-xl p-4 animate-[slideDown_.3s_ease] max-h-[70vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#EC003F]">فیلترها</h2>
            <button
              onClick={() => setShowMobileFilter(false)}
              className="text-gray-500 hover:text-red-500 p-1"
              aria-label="بستن فیلتر"
            >
              <FaChevronUp size={18} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {category.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveCat(item);
                  setTimeout(() => setShowMobileFilter(false), 300);
                }}
                className={`rounded-md text-sm py-2 px-3 transition-all flex-1 min-w-[70px]
                  ${
                    activeCat === item
                      ? "bg-[#EC003F] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-5">
            <span className="text-gray-700 font-semibold text-sm">
              بازه قیمتی
            </span>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-2"></div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 تومان</span>
              <span>100,000 تومان</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              {activeCat === "همه" 
                ? `نمایش همه ${items.length} محصول` 
                : `نمایش ${filteritems.length} محصول از دسته "${activeCat}"`
              }
            </p>
          </div>
        </div>
      )}

      {isMobile && showMobileFilter && (
        <div 
          className="fixed inset-0 bg-black/20 z-20"
          onClick={() => setShowMobileFilter(false)}
        />
      )}

      <div 
        className="flex flex-col lg:flex-row items-start justify-center p-2 md:p-4 gap-4 md:gap-5 w-full max-w-[1500px]"
        onClick={handleContentClick}
      >
        {!isMobile && (
          <div className="h-fit w-full lg:w-80 bg-white border border-gray-300 shadow-lg md:shadow-xl rounded-xl p-4 md:p-5 lg:sticky lg:top-24">
            <h2 className="text-lg md:text-xl font-bold text-[#EC003F] text-center mb-3 md:mb-4">
              فیلترها
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              {category.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveCat(item)}
                  className={`rounded-md text-sm md:text-[15px] py-1.5 md:py-1 px-3 md:px-5 transition-all flex-1 min-w-[70px] md:min-w-0 md:flex-none
                    ${
                      activeCat === item
                        ? "bg-[#EC003F] text-white shadow-md scale-[1.02] md:scale-[1.05]"
                        : "bg-gray-100 md:bg-gray-200 text-gray-700 hover:bg-gray-200 md:hover:bg-gray-300"
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-5 md:mt-6">
              <span className="text-gray-700 font-semibold text-sm md:text-[15px]">
                بازه قیمتی
              </span>
              <div className="w-full h-2 bg-gray-100 md:bg-gray-200 rounded-full mt-2 md:mt-3"></div>
            </div>
          </div>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full ${!isMobile ? 'lg:w-[calc(100%-340px)]' : ''}`}>
          {isMobile && (
            <div className="col-span-full flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <FaFilter size={16} className="text-[#EC003F]" />
                <span className="text-sm font-medium text-gray-700">
                  دسته‌بندی: 
                  <span className="text-[#EC003F] font-bold mr-1"> {activeCat}</span>
                </span>
              </div>
              <button
                onClick={() => setShowMobileFilter(true)}
                className="text-sm text-[#EC003F] hover:text-[#c70036] transition flex items-center gap-1"
              >
                تغییر
                <FaChevronDown size={12} />
              </button>
            </div>
          )}

          {filteritems.map((i) => (
            <div
              key={i.id}
              onClick={() => handleOpen(i)}
              className="w-full bg-white shadow-md md:shadow-lg rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 md:border-gray-200 hover:shadow-lg md:hover:shadow-2xl hover:scale-[1.01] md:hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              <div className="h-36 md:h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                {i.img ? (
                  <img
                    src={i.img}
                    alt={i.name}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">بدون تصویر</span>
                )}
              </div>

              <div className="p-3 md:p-4">
                <h2 className="text-base md:text-lg font-bold text-[#EC003F] line-clamp-1">
                  {i.name}
                </h2>

                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  دسته‌بندی: {i.category}
                </p>

                <p className="text-sm md:text-md text-gray-800 font-semibold mt-2 md:mt-2">
                  {i.price.toLocaleString()} تومان
                </p>

                <div className="flex justify-between mt-3 md:mt-4">
                  <button className="bg-[#EC003F] text-white text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-[#c70036] transition-all active:scale-95">
                    سفارش
                  </button>
                  <span className="text-xs md:text-sm text-gray-500 self-center">
                    برای جزئیات کلیک کنید
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteritems.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">محصولی در این دسته‌بندی یافت نشد.</p>
              <button
                onClick={() => setActiveCat("همه")}
                className="mt-4 bg-[#EC003F] text-white px-6 py-2 rounded-lg hover:bg-[#c70036] transition"
              >
                مشاهده همه محصولات
              </button>
            </div>
          )}
        </div>
      </div>

      {openItem && (
        <div 
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 md:p-4"
        >
          <div 
            className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative animate-[fadeIn_.3s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 md:top-3 md:right-3 z-10 bg-white rounded-full p-1.5 md:p-2 shadow-md text-gray-600 hover:text-red-500 hover:bg-gray-50 transition"
              onClick={() => setOpenItem(null)}
              aria-label="بستن مودال"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="h-48 md:h-56 bg-gray-50 flex items-center justify-center rounded-t-xl md:rounded-t-2xl overflow-hidden">
              {openItem.img ? (
                <img
                  src={openItem.img}
                  alt={openItem.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-400">بدون تصویر</span>
              )}
            </div>

            <div className="p-4 md:p-5">
              <h2 className="text-xl md:text-2xl font-bold text-[#EC003F]">
                {openItem.name}
              </h2>

              <p className="text-gray-600 mt-2 md:mt-3 text-sm md:text-base">
                دسته‌بندی: {openItem.category}
              </p>

              <p className="text-lg md:text-xl font-semibold text-gray-800 mt-3 md:mt-4">
                {openItem.price.toLocaleString()} تومان
              </p>

              <div className="mt-5 md:mt-6">
                <p className="text-gray-700 mb-3 text-sm md:text-base">تعداد:</p>
                <div className="flex items-center justify-between gap-3 md:gap-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <button
                      className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 text-xl rounded-lg hover:bg-gray-200 transition active:scale-95 flex items-center justify-center"
                      onClick={() => setCount((c) => Math.max(1, c - 1))}
                      aria-label="کاهش تعداد"
                    >
                      <span className="mb-1">-</span>
                    </button>

                    <span className="text-lg md:text-xl font-bold min-w-[30px] text-center">
                      {count}
                    </span>

                    <button
                      className="w-10 h-10 md:w-12 md:h-12 bg-[#EC003F] text-white text-xl rounded-lg hover:bg-[#c70036] transition active:scale-95 flex items-center justify-center"
                      onClick={() => setCount((c) => c + 1)}
                      aria-label="افزایش تعداد"
                    >
                      <span className="mb-1">+</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 md:gap-3">
                    <button 
                      onClick={() => {
                        removeFromCart(openItem.id);
                        if (isMobile) {
                          setTimeout(() => setOpenItem(null), 300);
                        }
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition active:scale-95 flex items-center justify-center"
                      aria-label="حذف از سبد خرید"
                    >
                      <FaTrashAlt size={isMobile ? 18 : 20} />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(openItem.id, count);
                  if (isMobile) {
                    setTimeout(() => setOpenItem(null), 300);
                  }
                }}
                className="mt-6 md:mt-8 w-full bg-[#EC003F] text-white py-3 md:py-4 rounded-xl hover:bg-[#c70036] transition active:scale-[0.98] text-base md:text-lg font-medium"
              >
                افزودن به سبد خرید ({count} عدد)
              </button>
              
              {isMobile && (
                <p className="text-center text-gray-500 text-xs mt-4">
                  برای بستن، خارج از این کادر کلیک کنید
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}