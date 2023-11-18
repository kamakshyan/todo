import { connectToDatabase } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {db} = await connectToDatabase();
    const time = new Date();
    await db.collection("todo").updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: {
            title: req.body.title,
            description: req.body.description,
            time: time.toLocaleString()
        
        } } 
      );

    res.status(200).json({"message": "Task Updated Successfully"});
}