import { APIResponse } from '@/common/types/api-res';
// import mongoose, { ConnectionStates } from 'mongoose';
const mongoose = require('mongoose');

import { NextApiRequest, NextApiResponse } from "next/types";


let cachedDb: any = null;

export async function connect() {
    if (cachedDb) {
        console.log('DB connection from catched...');
        return cachedDb;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI as string);
        cachedDb = db;
        console.log('New DB connection established successfully...');
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
}

export const withDatabase =
    (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await connect();
            return await handler(req, res);
        } catch (error) {
            console.error("Failed to connect to the database:", error);
            res.status(500).json({ message: "Internal Server Error" } as APIResponse);
        } finally {
            // await disconnect();
        }
    };
