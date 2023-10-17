import { useState } from "react";
import { SideMenuIcon } from "../icons";
import MenuItem from "./MenuItem";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ReduceSideBarIcon } from "../icons";


const Header = ({ userName, setOpenModal, toggleSideBar, sideMenuDisplay, sideBar }) => {

  

  const profileName = (userName.firstName &&  userName.lastName) && 
                        userName.firstName[0] + userName.lastName[0]

  const sideMenuIcon = sideBar ? (<ReduceSideBarIcon />) : (<SideMenuIcon />);
  
  const getCurrentDimension = () => {
    return {
      width: innerWidth,
      height: innerHeight
    }
  }
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    }
    window.addEventListener('resize', updateDimension);

    return(() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])

  

  return (
    <>
      <header className="fixed top-0 w-full flex justify-between items-center h-14 bg-slate-950 bg-opacity-80 z-50 shadow-md shadow-gray-500">
          <div className="hidden sm:block w-fit sm:w-64">
            <div className={ `w-fit items-center ${sideMenuDisplay}` }>
              <MenuItem 
                toggleSideBar={ toggleSideBar }
                sideBar={ sideBar }
                >
                { sideMenuIcon }
              </MenuItem>
            </div>
          </div>   
        <img 
          className={ `my-1 ms-4 h-10 w-30 ${ screenSize.width > 768 ? "me-36" : "me-32" }` }
          src={ screenSize.width > 640 ? "/logo/brand-logo.png"  : "/logo/brand-logo-header.png" }>
        </img>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 me-5 transition hover:ease-in duration-200 hover:bg-opacity-60 bg-purple-700 bg-opacity-40 rounded-full">
              <Link
                className="text-zinc-50 font-semibold" 
                to="/account">
                  { profileName }
              </Link>
            </div>
            <div className="">
              <NavBar
                setOpenModal={ setOpenModal }
                widthSize={ screenSize.width }/>
            </div>
            
          </div>
      </header>
    </>
  )
}

export default Header;