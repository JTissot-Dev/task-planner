import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import Header from "../components/header/Header";
import LogoutModal from "../components/modals/LogoutModal";
import { useState } from "react";
import SideBar from "../components/SideBar";


const DefaultLayout = () => {

  const {user, token, sideBar, setUser, setToken, setSideBar} = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  console.log(token);

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data);
      })
  }, [])

  const userName = {
    firstName: user.first_name,
    lastName: user.last_name
  };

  const [openModal, setOpenModal] = useState();

  const [sideMenuDisplay, setSideMenuDisplay] = useState('');
  
  const toggleSideBar = () => {
    setSideBar(!sideBar);
    if (sideBar) {
      setSideMenuDisplay('');
    }  else {
      setSideMenuDisplay('ml-48');
    } 
  }
  const displaySideBar = sideBar && <SideBar />

  const logout = () => {
    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }
  
  
  return (
    <div className="min-h-screen bg-slate-950">
      <Header 
        userName={ userName }
        setOpenModal={ setOpenModal }
        toggleSideBar = { toggleSideBar }
        sideMenuDisplay={ sideMenuDisplay }
        sideBar={ sideBar }/>
        { displaySideBar }
        <main 
          className={`container flex justify-center w-full pb-10 mx-auto min-h-screen z-0 ${sideBar && " sm:ps-64"}` }>
            <Outlet/>
        </main>

      <LogoutModal 
        openModal={ openModal } 
        setOpenModal={ setOpenModal }
        logout={ logout }/>
    </div>

  )
}

export default DefaultLayout;