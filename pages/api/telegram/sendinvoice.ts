import { withDatabase } from "@/common/lib/util/db";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { sendInvoice } from "@/common/lib/telegram/sendInvoice";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { telegramId } = req.body;
    await sendInvoice(telegramId as string);
    res.status(200).json({ message: "Success!" });
}

export default withDatabase(handler);