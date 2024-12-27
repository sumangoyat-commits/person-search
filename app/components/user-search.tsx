'use client'

import { useEffect, useState, useRef } from 'react'
import AsyncSelect from 'react-select/async'
import { getUserById, searchUsers } from '@/app/actions/actions'
import { User } from '@/app/actions/schemas'
import {UserCard} from './user-card'

interface Option {
  value: string
  label: string
  user: User
}

export default function UserSearch() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const prevUserIdRef = useRef<string | null>(null)

  useEffect(() => {
    const fetchLatestUserData = async () => {
      if (selectedUser?.id && selectedUser.id !== prevUserIdRef.current) {
        console.log('Fetching latest user data for:', selectedUser.id)
        const latestUser = await getUserById(selectedUser.id)
        console.log('Latest user data:', latestUser)
        setSelectedUser(latestUser)
      } else if (!selectedUser && prevUserIdRef.current) {
        console.log('User deselected')
      }
      prevUserIdRef.current = selectedUser?.id || null
    }

    fetchLatestUserData()
  }, [selectedUser?.id])

  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    const users = await searchUsers(inputValue)
    return users.map(user => ({ value: user.id, label: user.name, user }))
  }

  const handleChange = (option: Option | null) => {
    console.log('Selected user:', option)
    setSelectedUser(option ? option.user : null)
  }

  return (
    <div className="space-y-6">
      <AsyncSelect
        cacheOptions={false}
        loadOptions={loadOptions}
        onChange={handleChange}
        placeholder="Search for a user..."
        className="w-full max-w-md mx-auto"
      />
      {selectedUser && (
        <div key={selectedUser.id}>
          <UserCard user={selectedUser} />
        </div>
      )}
    </div>
  )
}

