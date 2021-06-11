import React, { createContext } from 'react'

export const UserContext = createContext({})

export const UserProvider = (props) => {
  return (
    <UserContext.Provider value={{
      name: 'Samuel'
    }}>
      {props.children}
    </UserContext.Provider>
  )
}
