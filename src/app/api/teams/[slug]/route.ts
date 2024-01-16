import dbConnect from "@/utils/dbConnect"

export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: string } }
) {
  const client = await dbConnect
  const team = await client.db("v0").collection("Team").findOne({ slug: slug })
  return Response.json(team)
}
