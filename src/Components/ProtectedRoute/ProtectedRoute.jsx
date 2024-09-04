import { Navigate } from "react-router-dom"

export default function ProtectedRoute({children}) {
    const userToken = localStorage.getItem('tkn')
    if (userToken !== null) return children
    else return <Navigate to={"/login"}></Navigate>
    
}
