import type { Team } from "@/utils/types"
import Link from "next/link"

type Props = {
  team: Team
}

const TeamCard = ({ team }: Props) => {
  return (
    <Link href={`/teams/${team.slug}`}>
      <div
        className='flex flex-row border-2 border-slate-500 p-1 text-xs
      '
      >
        <span>
          <p>{team.displayName}</p>
        </span>
      </div>
    </Link>
  )
}

export default TeamCard
