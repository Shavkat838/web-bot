import { useCallback, useEffect, useState } from "react";
import Card from "./components/card.jsx";
import {getData} from "./constans/db.js"
import Cart from "./components/cart.jsx";



const telegram=window.Telegram.WebApp
function App() {



  useEffect(()=>{
    telegram.ready()
  },[])
  const data=getData()
  const [items,setItems]=useState([])

  const onAddItem=(item)=>{
    const exisItem=items.find((c)=>c.id===item.id)
    if(exisItem){
     const newData=items.map((c)=>c.id===item.id? {...exisItem,quantity:exisItem.quantity+1}:c)
     setItems(newData)
    }else{
      const newData=[...items,{...item,quantity:1}]
      setItems(newData)
    } 
  }

  const onRemoveItem=(item)=>{
      const existItem=items.find((c)=>c.id===item.id)

      if(existItem.quantity===1){
        const newData=items.filter((c)=>c.id!==existItem.id)
        setItems(newData)
      }else{
        const newData=items.map((c)=>c.id===existItem.id?{...existItem,quantity:existItem?.quantity-1}:c)
        setItems(newData)
      }
  }



  const onCheckout=()=>{
       telegram.MainButton.text="Tolov qiling"
       telegram.MainButton.show()      
  }



  const onSendData=useCallback(()=>{
    telegram.sendData(JSON.stringify(items))
  },[items])


  useEffect(()=>{
    telegram.onEvent("mainButtonClicked",onSendData)
    return ()=>{telegram.offEvent("mainButtonClicked",onSendData)}
  },[onSendData])


  return (
    <div className="w-full h-full bg-zinc-900">
      <div className="w-full container min-h-screen  flex flex-wrap  items-center justify-around pt-20 gap-30  mx-auto px-40">
        <h1 className="text-4xl text-gray-100 font-bold">Kurslar ro'yxati</h1>
        <Cart  arr={items}   onCheckout={onCheckout}  />
        <div className="w-full h-auto p-4 flex flex-wrap justify-center ">
            {
              data.map((item,index)=>(
                < Card key={index+1}  item={item}   onAddItem={onAddItem}  onRemoveItem={onRemoveItem}  />
              ))
            } 
        </div>
      </div>
    </div>
  );
}

export default App;
