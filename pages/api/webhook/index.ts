
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { message } = req.body;

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
            await fetch(
                `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMessage`,
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

        res.status(200).json({ status: "ok" });
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}