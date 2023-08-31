 
import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Team = {
  id: string
  first_name: string
  last_name: string
  total_points: number
}
 
export const playerColumns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: "Player"
  },
  {
    accessorKey: "total_points",
    header: () => <div className="text-right">Points</div>,
    cell: ({row}) => <div className="text-right font-medium">{row.getValue("total_points")}</div>
  },
]