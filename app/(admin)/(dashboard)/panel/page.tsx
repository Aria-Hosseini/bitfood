"use client";

import Dashboard from "@/app/components/panel/Dashboard";
import Orders from "@/app/components/panel/Orders";
import Stats from "@/app/components/panel/Stats";
import { useState } from "react";

 export default function Panel (){

  const [activeMenu, setActiveMenu] = useState("داشبورد");
  const menupanel = ["داشبورد","سفارشات","آمار"]

  const render =()=>{
    switch(activeMenu){
      case "داشبورد":
        return <Dashboard />;
      case "سفارشات":
        return <Orders />;
      case "آمار":
        return <Stats />;
      default:
        return null;
    }
  };

  return(
    <div className=" flex flex-row items-center justify-between">
      <div className="fixed top-24 right-4 z-30 w-70 bg-gray-100 shadow-2xl rounded-lg h-155">
       {
        menupanel.map((item)=>(
          <div className="flex flex-col items-center justify-center m-5">
            <button key={item} onClick={()=>setActiveMenu(item)} className={`rounded-md py-1 px-5 transition w-40
                ${
                  activeMenu === item
                    ? "bg-[#EC003F] text-white"
                    : "bg-gray-300 hover:bg-[#d91d4fc3] hover:text-gray-100"
                }`}
                >{item}</button>
          </div>
        ))
       }
      </div>

      <div className="mr-80 mt-28 p-6 w-full">
        {render()}
      </div>
    </div>
  )
 }