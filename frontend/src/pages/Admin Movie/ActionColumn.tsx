import { Button } from '@/components/ui/button'
import { deleteMovie } from '@/services/movies/movie.service'
import { useMutation } from '@tanstack/react-query'
import { Edit, Trash } from 'lucide-react'
import React from 'react'
import { Link, useRevalidator } from 'react-router-dom'
import { toast } from 'sonner'

export interface ActionColumnProps {
    id:string
}

export default function ActionColumn({id}:ActionColumnProps) {
    const {isPending, mutateAsync} = useMutation({
        mutationFn : () => deleteMovie(id)
    })

    const revalidator = useRevalidator()

    const handleDelete = async () => {
        try {
            await mutateAsync()

            revalidator.revalidate()
            toast.success('Movie data successfully deleted')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

  return (
    <div className="inline-flex items-center gap-4 p-5">
      <Button size="sm" variant="secondary" asChild>
        <Link to ={`/admin/movies/edit/${id}`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
        </Link>
      </Button>

      <Button isLoading={isPending} onClick={handleDelete} size="sm" variant="destructive">
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  )
}
