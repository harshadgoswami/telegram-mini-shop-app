
import { sendToGoogleAnalytics4 } from "@/common/lib/googleAnalytics/sendToGoogleAnalitics4";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";


// implement this 
// https://core.telegram.org/bots/payments-stars#implementing-payments
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { message, pre_checkout_query, successful_payment } = req.body;

    console.log(req.body);


    // calling google analytics 
    // Send deposit event to GA4
    await sendToGoogleAnalytics4(
      'G-3MMLLMBW40', // Your GA4 Measurement ID
      'YOUR_API_SECRET', // Your GA4 API Secret
      'deposit', // Event name
      {
        value: 10,
        currency: "USD",
        transaction_id: "02D3xjsdf234",
      }
    );

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

      await fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMessage`,
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


      if (message.successful_payment) {

        // finally save purchase things in db here 
        // also save this information in database 
        //message.successful_payment.telegram_payment_charge_id;
        //message.successful_payment.provider_payment_charge_id;
        /**
     * {
update_id: 249323359,
message: {
message_id: 31,
from: {
id: 7130021259,
is_bot: false,
first_name: 'CMP',
last_name: 'Business Solutions',
language_code: 'en'
},
chat: {
id: 7130021259,
first_name: 'CMP',
last_name: 'Business Solutions',
type: 'private'
},
date: 1725335627,
successful_payment: {
currency: 'XTR',
total_amount: 1,
invoice_payload: 'pro_membership_payment',
telegram_payment_charge_id: 'stxXOp_QboTQRC5lLkBiemx44ERLTJjWem-cCBPDWEnJF-S01Zqo9-JULuqFYKeKigdIpBwLIVK5VO7LYKcAD3n6JkUOFq2rioQ7sdqNM-tPaQ',
provider_payment_charge_id: '7130021259_1'
}
}
}
     */
      }
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

      const { data, status } = await axios.post(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/answerPreCheckoutQuery`, {
        pre_checkout_query_id: pre_checkout_query.id,
        ok: true
      });

      console.log({ status, data });

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

    if (true) {



    }

    res.status(200).json({ status: "ok" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}