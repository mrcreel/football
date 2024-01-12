import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const conferenceName = searchParams.get("conferenceName")
  const division = searchParams.get("division")

  try {
    if (!conferenceName || !division)
      throw new Error("Missing conferenceName or division")
    await sql`INSERT INTO Conferences (Name, Division) VALUES (${conferenceName}, ${division});`
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
  const conferences = await sql`SELECT * FROM Conferences;`
  return NextResponse.json({ conferences }, { status: 200 })
}
