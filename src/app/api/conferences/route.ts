import dbConnect from "@/utils/dbConnect"

export async function GET(request: Request) {
  const client = await dbConnect
  const cursor = client
    .db("v0")
    .collection("Conference")
    .find()
    .sort({ name: 1 })
  const divisions = await cursor.toArray()
  return Response.json(divisions)
}
