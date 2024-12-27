
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/app/actions/schemas'

interface UserAvatarProps {
  user: User
}

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Avatar className="w-16 h-16">
      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
    </Avatar>
  )
}

