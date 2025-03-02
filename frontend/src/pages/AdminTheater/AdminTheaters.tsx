import TitleHeading from '@/components/TitleHeading'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Plus } from 'lucide-react'
import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { columns } from './columns'
import { Theaters } from '@/services/theaters/theaters.type'

export default function AdminTheaters() {
    const theaters = useLoaderData() as Theaters[]

  return (
    <>
    <TitleHeading title="List Theaters" />

    <div>
            <Button asChild className='mb-3'>
                <Link to = "/admin/theaters/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Genre
                </Link>
            </Button>
        <DataTable 
            columns={columns} 
            data={theaters} // Provide empty array as minimum
        />
        </div>
    </>
  )
}
