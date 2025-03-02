import TitleHeading from "@/components/TitleHeading";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";
import { useLoaderData } from "react-router-dom";
import { User } from "@/services/customer/customer.type";

export default function AdminCustomers() {
    const user = useLoaderData() as User[];

  return (
    <div>
      <TitleHeading title="List Customers" />

      <div className="my-3">
        <DataTable columns={columns} data={user} />
      </div>
    </div>
  );
}
