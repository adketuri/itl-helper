import { FC } from "react"
import { LeaderboardData, LeaderboardResponse } from "../../types"
import { FormLabel } from "@chakra-ui/react"
import { AutoComplete, AutoCompleteInput, AutoCompleteList, AutoCompleteItem } from "@choc-ui/chakra-autocomplete"

export interface UserSelectorProps {
  leaderboard?: LeaderboardResponse,
  setUserId: (arg: number) => void
}

export const UserSelector: FC<UserSelectorProps> = ({ leaderboard, setUserId }) => {
  return (
    <>
      <FormLabel>Username</FormLabel>
      <AutoComplete openOnFocus onChange={(entry) => setUserId(leaderboard!.data.leaderboard.find(l => l.name === entry)!.id)} maxSuggestions={5}>
        <AutoCompleteInput />
        <AutoCompleteList>
          {leaderboard?.data.leaderboard.map((leaderboardEntry) => (
            <AutoCompleteItem
              key={`option-${leaderboardEntry.id}`}
              value={leaderboardEntry.name}
            >
              {leaderboardEntry.name}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete></>
  )
}