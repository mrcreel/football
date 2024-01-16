export type Division = {
  _id: string
  name: string
  slug: string
  conferences: string[]
}

export type Conference = {
  _id: string
  name: string
  slug: string
  division: string
  teams: string[]
  logo: string
}

export type Schedule = {
  url: string
  sinceYear: number
  scheduleType: string
}

export type TeamColors = {
  primary: string
  secondary: string
}

export type Stadium = {
  name: string
  streetAddress: string
  city: string
  state: string
}

export type Team = {
  _id: string
  njcaaName: string
  mascot: string
  slug: string
  logo: string
  conference: string
  schedule: Schedule
  displayName: string
  njcaaTeamId: string
  njcaaAliases: string[]
  stadium: Stadium
  colors: TeamColors
}
