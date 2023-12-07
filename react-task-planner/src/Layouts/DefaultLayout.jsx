import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import Header from "../components/header/Header";
import LogoutModal from "../components/modals/LogoutModal";
import { useState } from "react";
import SideBar from "../components/SideBar";
import ConnectionAlert from "../components/alerts/ConnectionAlert";
import CreateProjectModal from "../components/modals/CreateProjectModal";


const DefaultLayout = () => {

  const {
    user, 
    token, 
    sideBar,
    connectionError,
    createProjectModal,
    currentProject, 
    setUser, 
    setToken, 
    setSideBar,
    resetContext
  } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (currentProject.id) {
      navigate(`/project/${currentProject.id}`);
    } 
  }, [currentProject.id]);

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
        resetContext();
      })
  }
  
  const connectionAlert = connectionError && <ConnectionAlert />;
  
  return (
    <div className="relative min-h-screen">
      { connectionAlert }
      <Header 
        userName={ userName }
        setOpenModal={ setOpenModal }
        toggleSideBar = { toggleSideBar }
        sideMenuDisplay={ sideMenuDisplay }
        sideBar={ sideBar }/>
        { displaySideBar }
        <main 
          className={`container flex justify-center pb-10 w-full mx-auto h-screen z-0 ${sideBar && " sm:ps-64"}` }>
            <Outlet/>
        </main>

      <LogoutModal 
        openModal={ openModal } 
        setOpenModal={ setOpenModal }
        logout={ logout }/>
      {
        createProjectModal && <CreateProjectModal />
      }
    </div>

  )
}

export default DefaultLayout;