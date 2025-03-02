import type { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/services/customer/customer.type";
import { dateFormat, rupiahFormat } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "createdAt",
    header: "Transaction Date",
    cell: ({ row }) => dateFormat(row.original.createdAt),
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    cell: ({ row }) => rupiahFormat(row.original.subtotal),
  },
  {
    accessorKey: "bookingFee",
    header: "Booking Fee",
    cell: ({ row }) => rupiahFormat(row.original.bookingFee),
  },
  {
    accessorKey: "tax",
    header: "Tax",
    cell: ({ row }) => rupiahFormat(row.original.tax),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => rupiahFormat(row.original.total),
  },
  {
    accessorKey: "movie",
    header: "Movie",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <div>
          <h3 className="mb-2">{transaction.movie.title}</h3>
          <Badge variant="secondary">{transaction.theater.name}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => row.original.user.name,
  },
];
