"use client";
import { useState } from "react";

export default function PriceRange() {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(500);

  const min = 0;
  const max = 1000;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative h-2 bg-zinc-200 rounded-full">
        {/* نوار رنگی وسط */}
        <div
          className="absolute h-2 bg-red-500 rounded-full"
          style={{
            left: `${(minVal / max) * 100}%`,
            width: `${((maxVal - minVal) / max) * 100}%`,
          }}
        ></div>

        {/* اسلایدر اول */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(e) =>
            setMinVal(Math.min(Number(e.target.value), maxVal - 1))
          }
          className="absolute top-0 left-0 w-full pointer-events-none opacity-0"
        />

        {/* اسلایدر دوم */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) =>
            setMaxVal(Math.max(Number(e.target.value), minVal + 1))
          }
          className="absolute top-0 left-0 w-full pointer-events-none opacity-0"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">حداقل: {minVal} تومان</span>
        <span className="font-medium">حداکثر: {maxVal} تومان</span>
      </div>
    </div>
  );
}
