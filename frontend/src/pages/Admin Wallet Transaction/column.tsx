import type { ColumnDef } from "@tanstack/react-table";
import { WalletTransaction } from "@/services/customer/customer.type";
import { dateFormat, rupiahFormat } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<WalletTransaction>[] = [
  {
    accessorKey: "createdAt",
    header: "Transaction Date",
    cell: ({ row }) => dateFormat(row.original.createdAt),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => rupiahFormat(row.original.price),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge>{row.original.status}</Badge>,
  },
  {
    accessorKey: "wallet",
    header: "Customer Name",
    cell: ({ row }) => row.original.wallet.user.name,
  },
];
