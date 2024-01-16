import type { Metadata } from "next"
import type { Division } from "@/utils/types"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Divisions | Juco Football Archive",
}

export default async function Divisions() {
  const baseUrl = process.env.BASE_URL
  const response = await fetch(`${baseUrl}/api/divisions`, {
    cache: "no-cache",
  })
  const divisions: Division[] = await response.json()

  return (
    <div className=''>
      {divisions.map((division) => {
        return (
          <Link href={`/divisions/${division.slug}`} key={division._id}>
            <p>{division.name}</p>
          </Link>
        )
      })}
    </div>
  )
}
