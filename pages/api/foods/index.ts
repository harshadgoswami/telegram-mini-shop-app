import { withDatabase } from "@/common/lib/util/db";
import Food, { IFood } from "@/common/models/Food";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const foods = await Food.find({}) as IFood[];
    res.status(200).json({ message: "Foods Data!", data: foods });
}

export default withDatabase(handler);