import type { Metadata } from "next"
import type { Conference } from "@/utils/types"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Conferences | Juco Football Archive",
}

export default async function Conferences() {
  const baseUrl = process.env.BASE_URL
  const conferencesRes = await fetch(`${baseUrl}/api/conferences`, {
    cache: "no-cache",
  })
  const conferences: Conference[] = await conferencesRes.json()

  return (
    <div className=''>
      {conferences.map((conference) => (
        <Link href={`/`} key={conference._id.toString()}>
          <h1>
            {conference.name}: {conference.teams.length} Teams
          </h1>
        </Link>
      ))}
    </div>
  )
}
