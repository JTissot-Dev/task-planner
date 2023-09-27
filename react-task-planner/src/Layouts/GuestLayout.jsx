import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import "./layout.css";
import MotionGuestForms from "../components/MotionGuestForms";



const GuestLayout = () => {
  const {user, token} = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="guest-background min-h-screen z-0">
      <div className="container flex justify-center items-center mx-auto min-h-screen pb-14 pt-6">
          <Outlet />
      </div>
    </div>
  )
}

export default GuestLayout;