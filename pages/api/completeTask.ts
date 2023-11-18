import { connectToDatabase } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {db} = await connectToDatabase();
    await db.collection("todo").updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: {
            status: req.body.statusData,
        } } 
      );

    res.status(200).json({"message": "Task Completed Successfully"});
}