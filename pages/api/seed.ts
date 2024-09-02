// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withDatabase } from "@/common/lib/util/db";
import Food, { IFood } from "@/common/models/Food";
import type { NextApiRequest, NextApiResponse } from "next";


async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const foods = [
    { title: "Pizza", price: 17.99, image: "https://media.istockphoto.com/id/187248625/photo/pepperoni-pizza.jpg?s=2048x2048&w=is&k=20&c=KWdxgdyv_fRDh8i8D5LToxbKpcRrNJ0iVCmQZ8LFoAY=" },
    { title: "Burger", price: 15, image: "https://media.istockphoto.com/id/1041137232/photo/100-gluten-free-low-carb-hamburger-and-bun.jpg?s=2048x2048&w=is&k=20&c=NTefRc_cJBY14JsjFwZ0qanX9N3YF5xmUciYp7IHI84=" },
    { title: "Coca", price: 3.5, image: "https://media.istockphoto.com/id/487787108/photo/can-of-coca-cola-on-ice.jpg?s=2048x2048&w=is&k=20&c=WdY2fPOPqSVmgH9dC3Tf1hobeayQj3RsnmaG0yXUKMc=" },
    { title: "Kebab", price: 13.99, image: "https://media.istockphoto.com/id/501266025/photo/seekh-kabab-5.jpg?s=2048x2048&w=is&k=20&c=XUML0d5CXhsaVXCmifmiHGsHLrFFrbq-TfDa9GyFg-s=" },
    { title: "Salad", price: 2.5, image: "https://plus.unsplash.com/premium_photo-1690489323642-6e057faf3c7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FsYWR8ZW58MHx8MHx8fDA%3D" },
    { title: "Bottle of water", price: 0.99, image: "https://media.istockphoto.com/id/185072125/photo/bottle-of-spring-water.jpg?s=2048x2048&w=is&k=20&c=2a4ee87jJqkXwmXfbfkajIv9fxerI0PI6CkTCLm11oY=" },
    { title: "Ice cream", price: 2.99, image: "https://media.istockphoto.com/id/157472912/photo/ice-cream-composition-on-a-bowl.jpg?s=2048x2048&w=is&k=20&c=Trm8Wksa3ozWfxSltDFy2DNcFNWTDEqZcRRpPUc5Paw=" },
  ] as IFood[];

  for (let i = 0; i < foods.length; i++) {
    const food = new Food(foods[i]);
    await food.save();
  }


  res.status(200).json({ message: "seeding done!" });
}

export default withDatabase(handler);