import TitleHeading from '@/components/TitleHeading'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Plus } from 'lucide-react'
import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { columns } from './columns'
import { Movie } from '@/services/movies/movie.type'

export default function AdminMovie() {
  const movies = useLoaderData() as Movie[]

  return (
    <div>
      <TitleHeading title = "List Movies"/>

      <div>
            <Button asChild className='my-3'>
                <Link to = "/admin/movies/create">
                <Plus className="h-4 w-4 mr-2" />
                Create data movie
                </Link>
            </Button>
          <DataTable 
            columns={columns} 
            data={movies} 
          />
        </div>
    </div>
  )
}
