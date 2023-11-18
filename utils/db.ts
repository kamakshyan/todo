import {MongoClient} from 'mongodb';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';

let cachedClient: any = null;
let cachedDb: any = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {client: cachedClient, db: cachedDb};
    };
    const client = new MongoClient(url);
    await client.connect();

    const db = await client.db('todo');

    cachedClient = client;
    cachedDb = db;

    return {
        client,
        db
    };
}


