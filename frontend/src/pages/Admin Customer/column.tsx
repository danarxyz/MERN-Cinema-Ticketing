import type { ColumnDef } from "@tanstack/react-table";
import { User } from "@/services/customer/customer.type";


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
