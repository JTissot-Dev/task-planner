import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";


const GuestLayout = () => {
  const {user, token} = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default GuestLayout;