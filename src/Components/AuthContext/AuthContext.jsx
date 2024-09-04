import { createContext, useEffect, useState } from "react"

export const authContext = createContext();
export default function AuthContext({ children }) {
    const [token, setToken] = useState(null)
    const userToken = localStorage.getItem("tkn");
    useEffect(() => {
        if (userToken !== null) {
            setToken(userToken)
        }
    } , [])
  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
