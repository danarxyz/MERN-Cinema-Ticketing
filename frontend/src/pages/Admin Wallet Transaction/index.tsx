import TitleHeading from "@/components/TitleHeading";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./column";
import {WalletTransaction} from "@/services/customer/customer.type";
import { useLoaderData } from "react-router-dom";

export default function AdminWalletTransaction() {
    const walletTransactions = useLoaderData() as WalletTransaction[];
    
  return (
    <div>
      <TitleHeading title="List Wallet Transactions" />

      <div className="my-3">
        <DataTable columns={columns} data={walletTransactions} />
      </div>
    </div>
  );
}
