import { Badge } from "@/components/ui/badge"
import type { Theaters } from "@/services/theaters/theaters.type"
import type { ColumnDef } from "@tanstack/react-table"
import ActionColumn from "./ActionColumn"

export const columns: ColumnDef<Theaters>[] = [
    {
      accessorKey: "name",
      header: "Theaters",
    },
    {
        accessorKey: "city",
        header: "City",
        cell:({row})=> <Badge>{row.original.city}</Badge>
    },
    {
        id: "action",
        cell: ({ row }) => {
            const theaters = row.original

            return (
                <ActionColumn id={theaters._id} />

            )
        }
    }
]