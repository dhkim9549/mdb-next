import { MongoClient } from "mongodb";

export async function POST(request: Request) {

  console.log("POST() start...");

  const res = await request.json();

  console.log(`res = ${JSON.stringify(res)}`);
  let data = res;

  const client = new MongoClient(process.env.MONGODB_URI, {
  });

  let resData = {};

  try {
    await client.connect();

    const database = client.db("dbTest");
    const collection = database.collection("colTest");
    resData = await collection.find(data).limit(10).toArray();
    console.log(`resData = ${JSON.stringify(resData)}`);

  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }

  console.log("POST() end...");

  return Response.json(resData);
}

