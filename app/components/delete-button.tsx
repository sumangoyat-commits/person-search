import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react'
import { deleteUser } from '@/app/actions/actions'

export default function DeleteButton({ userId }: { userId: string }) {
  return (
    <form action={deleteUser.bind(null, userId)}>
      <Button type="submit" variant="destructive" size="sm">
        <Trash className="w-4 h-4 mr-2" />
        Delete
      </Button>
    </form>
  )
}

