import { totalPrice } from "../units/total-price";
export default function Cart(props) {
  const { arr, onCheckout } = props;
  return (
    <div className="w-full max-w-4xl bg-[#1a1a1a] p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 border border-gray-800 shadow-md">
      <p className="text-xl sm:text-2xl text-white font-bold text-center sm:text-left">
        Umumiy narx: <span className="text-green-500">${totalPrice(arr)}</span>
      </p>

      <button
        onClick={onCheckout}
        className="w-full sm:w-auto cursor-pointer py-2.5 px-6 flex items-center justify-center border-none rounded-md bg-green-700 text-white font-semibold text-[18px] hover:bg-green-600 transition-all active:scale-95 shadow-lg shadow-green-900/20"
      >
        Buyurtma
      </button>
    </div>
  );
}
