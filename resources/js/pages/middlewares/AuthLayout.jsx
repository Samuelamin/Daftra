import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../../Context/AuthContext"
import { Loading } from "../Layout/Loading"

const AuthLayout = () => {
    const {user} = useAuthContext()
    return user !== 0 ?
        !user ?  <Loading />
            :
            <Outlet/>
    : <Navigate to='/login'/>
}

export default AuthLayout
