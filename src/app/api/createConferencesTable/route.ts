import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  try {
    const result =
      await sql`CREATE TABLE Conferences ( Name varchar(255), Division varchar(255) );`
    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: `Something went wrong. Error message: ${error}` },
      { status: 500 }
    )
  }
}
