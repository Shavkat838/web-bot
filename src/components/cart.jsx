import { totalPrice } from "../units/total-price";
export default function Cart(props) {
  const {arr}=props
  return (
    <div className="w-full  flex justify-center gap-5 items-center">
      <p className="text-2xl text-white  text-bold">
        Umumiy narx <span>${totalPrice(arr)}</span>
      </p>
      <button
      onClick={totalPrice(arr)}
        className="flex w-1/6 cursor-pointer py-2 px-3 items-center justify-center border-none rounded-sm bg-green-700 text-white text-[18px]"
      >
        Buyurtma
      </button>
    </div>
  );
}
