import { MongoClient } from "mongodb";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {

  const client = new MongoClient(process.env.MONGODB_URI, {
  });

  let allData;

  try {
    await client.connect();

    // Choose a name for your database
    const database = client.db("user_data_db");

    // Choose a name for your collection
    const collection = database.collection("user_data_collection");
    allData = await collection.find({}).toArray();
    console.log(`allData = ${JSON.stringify(allData)}`);

  } catch (error) {
     throw error; 
  } finally {
      await client.close();
  }

  return Response.json(allData)
}
