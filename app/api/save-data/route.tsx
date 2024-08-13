import { MongoClient } from "mongodb";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {

  const client = new MongoClient(process.env.MONGODB_URI, {
  });

  let data = {};
  data.aaa = "ffff";

  let msg = {};

  try {
    await client.connect();

    const database = client.db("user_data_db");
    const collection = database.collection("user_data_collection");
    await collection.insertOne({ data });

  } catch (error) {
     throw error;
  } finally {
      await client.close();
  }

  return Response.json(msg);
}
