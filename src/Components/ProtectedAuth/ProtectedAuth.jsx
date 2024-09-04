import { Navigate } from 'react-router-dom'

export default function ProtectedAuth( {children}) {
    const userToken = localStorage.getItem('tkn')
    if (userToken !== null) return <Navigate to={"/home"} />
    else return children
   
}
