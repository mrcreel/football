import dbConnect from "@/utils/dbConnect"

export async function GET(request: Request) {
  const client = await dbConnect
  const cursor = client.db("v0").collection("Team").find().sort({ slug: 1 })
  const data = await cursor.toArray()
  return Response.json(data)
}
