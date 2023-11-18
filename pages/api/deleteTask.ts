import { connectToDatabase } from "@/utils/db";
import { ObjectId } from "mongodb";

export default async function handler(req:any, res:any){

    const {db} = await connectToDatabase();

    await db.collection("todo").deleteOne({
        _id: new ObjectId(req.body.id)
    });

    res.status(200).end();
}