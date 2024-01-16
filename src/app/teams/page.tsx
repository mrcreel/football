import type { Metadata } from "next"
import type { Team } from "@/utils/types"

import TeamCard from "../components/TeamCard"

export const metadata: Metadata = {
  title: "Teams | Juco Football Archive",
}

export default async function Teams() {
  const baseUrl = process.env.BASE_URL
  const response = await fetch(`${baseUrl}/api/teams`, { cache: "no-cache" })
  const teams: Team[] = await response.json()
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1'>
      {teams.map((team) => (
        <TeamCard team={team} key={team._id.toString()} />
      ))}
    </div>
  )
}
