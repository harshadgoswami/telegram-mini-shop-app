import Image from "next/image";
import { Inter } from "next/font/google";
import { Fragment, useEffect, useState } from "react";

import Card from "@/components/Card/Card";
import Cart from "@/components/Cart/Cart";
import axios from "axios";
import { sendInvoice } from "@/components/TelegramService/telegramservice";
import { IFood, ICartItem } from "@/types/food.type";

const inter = Inter({ subsets: ["latin"] });

let foods: IFood[] = [];

export default function Home() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [getmeres, setGetmeres] = useState(0);
  const [foods, setFoods] = useState<IFood[]>([]);

  useEffect(() => {
    //capture foods from the database
    axios.get(`/api/foods`).then((res) => {
      debugger;
      setFoods(res.data.data);
    });

    axios.get("https://api.telegram.org/bot{}/getMe").then((res) => {
      setGetmeres(Number(res.data.result._id));
    });
  }, []);

  const onAdd = (food: IFood) => {
    const exist = cartItems.find((x) => x._id === food._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === food._id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food: IFood) => {
    const exist = cartItems.find((x) => x._id === food._id);
    if (exist?.quantity === 1) {
      setCartItems(cartItems.filter((x) => x._id !== food._id));
    } else {
      setCartItems(
        //@ts-ignore
        cartItems.map((x) =>
          x._id === food._id ? { ...exist, quantity: exist!.quantity - 1 } : x
        )
      );
    }
  };

  const onCheckout = () => {
    //do checkout here
    sendInvoice("7130021259".toString());
  };

  return (
    <>
      <h1 className="heading">Order Food</h1>
      <div>{getmeres}</div>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {foods.map((food: IFood) => {
          return (
            <Card
              food={food}
              key={food._id}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          );
        })}
      </div>
    </>
  );
}
