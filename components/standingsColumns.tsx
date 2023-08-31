 
import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Team = {
  id: string
  rank: number
  entry_name: string
  player_name: string
  total: number
  event_total: number
  last_rank: number
  rank_sort: number
  entry: number
}
 
export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "rank",
    header: "Position"
  },
  {
    accessorKey: "entry_name",
    header: "Team",
  },
  {
    accessorKey: "player_name",
    header: "Manager",
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Points</div>,
    cell: ({row}) => <div className="text-right font-medium">{row.getValue("total")}</div>
  },
]