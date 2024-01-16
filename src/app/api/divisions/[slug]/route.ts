import dbConnect from "@/utils/dbConnect"

export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: string } }
) {
  const client = await dbConnect
  const division = await client
    .db("v0")
    .collection("Division")
    .findOne({ slug: slug })
  return Response.json(division)
}
