import { createContext, ReactNode, useEffect, useState } from "react"

import { UserDTO } from "@dtos/UserDTO"

import { api } from "@services/api"

import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "@storage/storageUser"

export type AuthContextProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  const signIn = async (email: string, password: string) => {
    const { data } = await api.post("/sessions", { email, password })

    if (data.user) {
      setUser(data.user)
      await storageUserSave(data.user)
    }
  }

  const signOut = async () => {
    setIsLoadingUserStorageData(true)

    setUser({} as UserDTO)
    await storageUserRemove()

    setIsLoadingUserStorageData(false)
  }

  const loadUserData = async () => {
    const user = await storageUserGet()

    setUser(user)
    setIsLoadingUserStorageData(false)
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
