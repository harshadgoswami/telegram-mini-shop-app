
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { message, pre_checkout_query } = req.body;

        console.log(req.body);
        /**
         * {
  update_id: 249323344,
  pre_checkout_query: {
    id: '4100631857539134326',
    from: {
      id: 954752754,
      is_bot: false,
      first_name: 'Harshad',
      last_name: 'Goswami',
      username: 'harshadgoswami',
      language_code: 'en'
    },
    currency: 'USD',
    total_amount: 500,
    invoice_payload: 'pro_membership_payment'
  }
}
         */


        if (message) {
            const userId = message.from.id; // This is the current user's Telegram ID
            const firstName = message.from.first_name;
            const lastName = message.from.last_name;
            const username = message.from.username;

            // Do something with the user information, e.g., store in database, send a response, etc.
            console.log(
                `User ID: ${userId}, First Name: ${firstName}, Username: ${username}`
            );

            // You can respond back to the user via the bot

            await fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMessage`
                ,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chat_id: userId,
                        text: `Hello, ${firstName}! Your Telegram ID is ${userId}.`,
                    }),
                }
            );
        }

        if (pre_checkout_query) {

            // answer the pre checkout query 
            const userId = pre_checkout_query.from.id;

            // VALIDATE ORDER (business logic)

            // MAKE PAYMENT (business logic)

            // save pre_checkout_query.id in database for later reference 

            // THEN respond back to the user with answer precheckout query 
            // reference : https://core.telegram.org/bots/api#answerprecheckoutquery
            console.log("answerPreCheckout now ", pre_checkout_query.id);

            axios.post(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMessage`, {
                pre_checkout_query_id: pre_checkout_query.id,
                ok: true
            }).then((resp) => {

                console.log(resp.data.data)

            }).catch((resp) => {
                console.log({ error: true, resp })
            });

            // await fetch(
            //     `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/answerPreCheckoutQuery`,
            //     {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify({
            //             pre_checkout_query_id: pre_checkout_query.id,
            //             ok: "True",
            //             error_message: "something went wrong"
            //         }),
            //     }
            // );
        }

        res.status(200).json({ status: "ok" });
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}