// import { createContext } from "react";


// const UserContext = createContext();


// export default UserContext;
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const UserContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [cart, setCart] = useState([]);

  

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