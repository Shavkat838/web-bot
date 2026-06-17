import { useCallback, useEffect, useState } from "react";
import Card from "./components/card.jsx";
import { getData } from "./constans/db.js";
import Cart from "./components/cart.jsx";

const telegram = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    telegram.ready();
  }, []);
  const data = getData();
  const [items, setItems] = useState([]);

  const onAddItem = (item) => {
    const exisItem = items.find((c) => c.id === item.id);
    if (exisItem) {
      const newData = items.map((c) =>
        c.id === item.id ? { ...exisItem, quantity: exisItem.quantity + 1 } : c,
      );
      setItems(newData);
    } else {
      const newData = [...items, { ...item, quantity: 1 }];
      setItems(newData);
    }
  };

  const onRemoveItem = (item) => {
    const existItem = items.find((c) => c.id === item.id);

    if (existItem.quantity === 1) {
      const newData = items.filter((c) => c.id !== existItem.id);
      setItems(newData);
    } else {
      const newData = items.map((c) =>
        c.id === existItem.id
          ? { ...existItem, quantity: existItem?.quantity - 1 }
          : c,
      );
      setItems(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Tolov qiling";
    telegram.MainButton.show();
  };

  const onSendData = useCallback(() => {
    const queryID=telegram.initDataUnsafe.query_id;
    if(queryID){
      const obj={
        products:items,
        queryID:queryID
      }
       fetch('http://localhost:8000/web-data',{
        method:"POST",
        headers:{
          'Content-Type':"Application/json"
        },
        body:JSON.stringify(obj)
       })
    }else{
    telegram.sendData(JSON.stringify(items));
    }
  }, [items]);



  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);
    return () => {
      telegram.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);



  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white pb-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 flex flex-col items-center gap-6">
        <h1 className="text-3xl sm:text-4xl text-gray-100 font-bold text-center">
          Kurslar ro'yxati
        </h1>

        <Cart arr={items} onCheckout={onCheckout} />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 justify-items-center">
          {data.map((item, index) => (
            <Card
              key={index + 1}
              item={item}
              onAddItem={onAddItem}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
