import { useAuth0 } from "@auth0/auth0-react"
import { useDispatch } from "react-redux"
import { actionLogout } from "../../redux/actions/index"

export default function Logout() {
  const { isAuthenticated, logout } = useAuth0()
  const dispatch = useDispatch()
  return (
    <span style={{width: "100%", textAlign: "left"}}
      onClick={() => {
        dispatch(actionLogout())
        isAuthenticated && logout({ returnTo: window.location.origin })
      }}>
      Logout
    </span>
  )
}
