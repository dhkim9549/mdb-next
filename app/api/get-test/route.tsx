export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {

  let allData = {};
  allData.aaa = "kkk";
  console.log(JSON.stringify(allData));

  return Response.json(allData)
}
