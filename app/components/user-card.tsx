'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, Mail, Trash, Edit } from 'lucide-react'
import { User } from '@/app/actions/schemas'
import { getUserById } from '@/app/actions/actions'
import { UserAvatar } from './user-avatar'
import DeleteButton from './delete-button'

interface UserCardProps {
  user: User
}

export function UserCard({ user: initialUser }: UserCardProps) {
  const [user, setUser] = useState<User | null>(initialUser)

  useEffect(() => {
    const fetchLatestUserData = async () => {
      if (initialUser?.id) {
        try {
          const latestUser = await getUserById(initialUser.id)
          setUser(latestUser)
        } catch (error) {
          console.error('Error fetching user data:', error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }

    fetchLatestUserData()
  }, [initialUser])

  if (!user) {
    return null
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <UserAvatar user={user} />
        <div className="flex flex-col">
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <Badge variant="secondary" className="w-fit mt-1">ID: {user.id}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{user.phoneNumber}</span>
        </div>
        {user.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <DeleteButton userId={user.id} />
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}

