import dbConnect from "@/utils/dbConnect"

export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: string } }
) {
  const client = await dbConnect
  const conference = await client
    .db("v0")
    .collection("Conference")
    .findOne({ slug: slug })
  return Response.json(conference)
}
