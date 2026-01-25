'use client'

import { createContext, useContext } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface UserContextType {
  user: User | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ 
  children, 
  user 
}: { 
  children: React.ReactNode
  user: User | null 
}) {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
