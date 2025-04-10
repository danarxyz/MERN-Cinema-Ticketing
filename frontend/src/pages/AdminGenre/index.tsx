import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { Link, useLoaderData } from 'react-router-dom'
import { Plus } from 'lucide-react'
import TitleHeading from '@/components/TitleHeading'
import type { Genre } from '@/services/genre/genre.type'

export default function AdminGenre() {
    const genres = useLoaderData() as Genre[]

  return (
    <>
        <TitleHeading title ="List Genre"/>
        <div>
            <Button asChild className='mb-3'>
                <Link to = "/admin/genres/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Genre
                </Link>
            </Button>
        <DataTable 
            columns={columns} 
            data={genres} // Provide empty array as minimum
        />
        </div>
    </>
  )
}
