import { useState } from "react";

export default function Card(props) {
  const {item,onAddItem,onRemoveItem, } = props;
  const [count,setCount]=useState(0)


  const handleIncrement=()=>{
      onAddItem(item)
      setCount(count+1)
  }

  
  const handleDecrement=()=>{
    if(count<=1){
      setCount(0)
    }else{
      setCount(count-1)
    }
   onRemoveItem(item)
  }
  return (
    <div className="w-90  mx-3 my-3 p-2  flex flex-wrap relative justify-around   bg-[#202020] rounded-[10px]">
      <div className={` ${ count===0 &&"hidden transition-all opacity-0 pointer-events-none "}  transition-opacity duration-500  absolute  -top-5  -right-5  opacity-100   w-10 h-10 rounded-full   bg-amber-600  flex items-center justify-center text-white text-2xl  shadow-md hover:bg-amber-700  opacity-50  `}>
        {count}
      </div>
      <img
        className="w-full rounded-2xl h-85"
        src={item.Image}
        alt={item.title}
      />

      <div className="w-full flex items-center justify-between  p-2 my-3 ">
        <h1 className="text-2xl font-bold  text-white ">{item.title}</h1>

        <p className="text-blue-700  text-xl">
          <span> $</span>
          {item.price}
        </p>
      </div>
      <div className="flex  items-center w-full py-4  justify-between px-2 gap-2   border-t-2 border-t-gray-500">
        <button onClick={()=>handleIncrement(item)} className="flex w-full cursor-pointer py-1 px-2 items-center justify-center border-none rounded-sm bg-[#b8e63b] text-white text-[18px]">
          +
        </button>
        <button onClick={()=>handleDecrement(item)} className="flex  py-1 cursor-pointer px-2 w-full items-center justify-center border-none rounded-sm bg-[#a3423b] text-white text-[18px]">
          -
        </button>
      </div>
    </div>
  );
}
