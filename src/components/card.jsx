import { useState } from "react";

export default function Card(props) {
  const { item, onAddItem, onRemoveItem } = props;
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    onAddItem(item);
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count <= 1) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
    onRemoveItem(item);
  };
  return (
    <div className="w-full max-w-77.5 sm:max-w-sm mx-auto my-3 p-3 flex flex-col justify-between bg-[#202020] rounded-[10px] relative shadow-lg">
      <div
        className={` ${count === 0 && "hidden opacity-0 pointer-events-none"} transition-all duration-500 absolute -top-3 -right-3 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white text-lg font-bold shadow-md z-10`}
      >
        {count}
      </div>

      <img
        className="w-full rounded-xl h-48 sm:h-56 object-cover"
        src={item.Image}
        alt={item.title}
      />

      <div className="w-full flex items-center justify-between p-1 my-3">
        <h1 className="text-xl font-bold text-white truncate mr-2">
          {item.title}
        </h1>
        <p className="text-blue-500 font-semibold text-lg shrink-0">
          <span>$</span>
          {item.price}
        </p>
      </div>

      <div className="flex items-center w-full pt-3 justify-between gap-3 border-t border-t-gray-700 mt-auto">
        <button
          onClick={() => handleIncrement(item)}
          className="flex-1 cursor-pointer py-2 px-4 flex items-center justify-center border-none rounded-md bg-[#b8e63b] text-zinc-900 font-bold text-[18px] hover:bg-[#a5cf32] active:scale-95 transition-all"
        >
          +
        </button>
        <button
          onClick={() => handleDecrement(item)}
          className="flex-1 cursor-pointer py-2 px-4 flex items-center justify-center border-none rounded-md bg-[#a3423b] text-white font-bold text-[18px] hover:bg-[#8f3630] active:scale-95 transition-all"
        >
          -
        </button>
      </div>
    </div>
  );
}
