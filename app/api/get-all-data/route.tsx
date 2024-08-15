import { MongoClient } from "mongodb";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {

  const client = new MongoClient(process.env.MONGODB_URI, {
  });

  let allData;

  try {
    await client.connect();

    const database = client.db("dbTest");

    const collection = database.collection("colTest");
    allData = await collection.find({}).limit(10).toArray();
    console.log(`allData = ${JSON.stringify(allData)}`);

  } catch (error) {
     throw error; 
  } finally {
      await client.close();
  }

  return Response.json(allData)
}
