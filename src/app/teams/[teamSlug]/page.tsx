import type { Team } from "@/utils/types"

export default async function Team({
  params,
}: {
  params: { teamSlug: string }
}) {
  const teamSlug: string = params.teamSlug

  const baseUrl = process.env.BASE_URL
  const response = await fetch(`${baseUrl}/api/teams/${teamSlug}`, {
    cache: "no-cache",
  })
  const team: Team = await response.json()
  console.log(team.displayName)

  return (
    <>
      {team.displayName} {team.mascot}
    </>
  )
}
