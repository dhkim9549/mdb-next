import { MongoClient } from "mongodb";

export async function POST(request: Request) {

  console.log("POST() start...");

  const res = await request.json();

  console.log(`res= ${JSON.stringify(res)}`);
  let data = res;

  const client = new MongoClient(process.env.MONGODB_URI, {
  });

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

