import { createContext, ReactNode, useState } from "react"

import { UserDTO } from "@dtos/UserDTO"

export type AuthContextProps = {
  user: UserDTO
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
  const [user, setUser] = useState({
    user: {
      id: "1",
      name: "Cesar Simionato",
      email: "cesar.medeiros.simionato@gmail.com",
      avatar: "cesar.png",
    },
  })

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
