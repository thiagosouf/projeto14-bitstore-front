import React, { createContext, useState } from "react";

export const UserContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user, setUser, address, setAddress
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default AuthProvider;