import { MongoClient } from "mongodb";

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {

  const searchParams = request.nextUrl.searchParams;
  const params = Object.fromEntries(new URLSearchParams(searchParams));

  console.log("params = " + JSON.stringify(params));
  params.i = Number(params.i);
  console.log("params = " + JSON.stringify(params));

  const client = new MongoClient(process.env.MONGODB_URI, {
  });

  let resData = {};

  try {
    await client.connect();

    const database = client.db("dbTest");

    const collection = database.collection("colTest");
    resData = await collection.find(params).limit(10).toArray();
    console.log(`resData = ${JSON.stringify(resData)}`);

  } catch (error) {
     throw error;
  } finally {
     await client.close();
  }

  return Response.json(resData)
}
