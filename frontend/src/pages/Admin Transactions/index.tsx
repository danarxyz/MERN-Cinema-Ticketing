import TitleHeading from "@/components/TitleHeading";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./column";
import { Transaction} from "@/services/customer/customer.type";
import { useLoaderData } from "react-router-dom";

export default function AdminTransaction() {
    const transaction = useLoaderData() as Transaction[];
    
  return (
    <div>
      <TitleHeading title="List Transaction" />

      <div className="my-3">
        <DataTable columns={columns} data={transaction} />
      </div>
    </div>
  );
}
