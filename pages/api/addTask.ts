import { connectToDatabase } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {db} = await connectToDatabase();
    const time = new Date();
    await db.collection("todo").insertOne({
        title: req.body.title,
        description: req.body.description,
        time: time.toLocaleString(),
        status: false,
    });

    res.status(200).json({"message": "Task Added Successfully"});
}