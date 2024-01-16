import dbConnect from "@/utils/dbConnect"
import type { Division } from "@/utils/types"
import { GrUserSettings } from "react-icons/gr"

export default async function Table() {
  const baseUrl = process.env.BASE_URL
  const response = await fetch(`${baseUrl}/api`)
  const divisions: Division[] = await response.json()
  return (
    <div className=''>
      {divisions.map((division) => (
        <h1 key={division._id.toString()}>
          {division.name}: {division.conferences.length} Conferences
        </h1>
      ))}
    </div>
  )
}

/*
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    const cursor = client
      .db("v0")
      .collection("Division")
      .find()
      .sort({ name: 1 })
    const array = await cursor.toArray()
    return array
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

export default async function Database() {
  const divisions = await run()
  run().catch(console.dir)
  return (
    <>
      {divisions.map((division) => (
        <h1 key={division._id.toString()}>{division.name}</h1>
      ))}
    </>
  )
}
*/
