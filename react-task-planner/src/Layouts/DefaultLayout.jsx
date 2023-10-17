import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import Header from "../components/header/Header";
import LogoutModal from "../components/modals/LogoutModal";
import { useState } from "react";
import SideBar from "../components/SideBar";


const DefaultLayout = () => {

  const {user, token, setUser, setToken} = useStateContext();


  if (!token) {
    return <Navigate to="/login" />;
  }

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

  

  const [sideBar, setSideBar] = useState(false);
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
    <div className="min-h-screen bg-zinc-50">
      <Header 
        userName={ userName }
        setOpenModal={ setOpenModal }
        toggleSideBar = { toggleSideBar }
        sideMenuDisplay={ sideMenuDisplay }
        sideBar={ sideBar }/>
        { displaySideBar }
        <main 
          className={`container pt-24 pb-10 mx-auto min-h-screen z-0 ${sideBar && " sm:ps-64"}` }>
            <div className="flex justify-center h-auto w-full">
              <Outlet userName={ user }/>
            </div>
            
        </main>

      <LogoutModal 
        openModal={ openModal } 
        setOpenModal={ setOpenModal }
        logout={ logout }/>
    </div>

  )
}

export default DefaultLayout;