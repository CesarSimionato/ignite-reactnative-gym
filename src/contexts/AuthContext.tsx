import { createContext, ReactNode, useEffect, useState } from "react"

import { UserDTO } from "@dtos/UserDTO"

import { api } from "@services/api"

import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "@storage/storageUser"
import {
  storageAuthTokenSave,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from "@storage/storageAuthToken"

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

  const userAndTokenUpdate = (user: UserDTO, token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(user)
  }

  const signIn = async (email: string, password: string) => {
    const { data } = await api.post("/sessions", { email, password })

    if (data.user && data.token) {
      setIsLoadingUserStorageData(true)

      await storageUserSave(data.user)
      await storageAuthTokenSave(data.token)

      userAndTokenUpdate(data.user, data.token)

      setIsLoadingUserStorageData(false)
    }
  }

  const signOut = async () => {
    setIsLoadingUserStorageData(true)

    setUser({} as UserDTO)
    await storageUserRemove()
    await storageAuthTokenRemove()

    setIsLoadingUserStorageData(false)
  }

  useEffect(() => {
    const loadUserData = async () => {
      const user = await storageUserGet()
      const token = await storageAuthTokenGet()

      if (token) {
        userAndTokenUpdate(user, token)
      }

      setIsLoadingUserStorageData(false)
    }
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
