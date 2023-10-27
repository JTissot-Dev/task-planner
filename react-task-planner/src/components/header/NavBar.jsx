import MenuItem from "./MenuItem"
import { LogoutMenuIcon } from "../icons"
import { HomeMenuIcon } from "../icons"
import { NavBarDropdownIcon } from "../icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const NavBar = ({setOpenModal, widthSize}) => {


  const [dropDown, setDropDown] = useState(false)
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  }

  const listMenu = [(<HomeMenuIcon />), (<LogoutMenuIcon />)]
  const MenuItems = listMenu.map((MenuIcon, index) => {
    return (
      <li key={ index }>
        <MenuItem
          index={ index } 
          setOpenModal={ setOpenModal }
          navigate={ navigate }
        >
          { MenuIcon }
        </MenuItem>
      </li>
    )  
  })

  const dropDownItems = (
    <ul className={ `w-full bg-slate-950 shad shadow-md flex flex-col items-center fixed top-14 rounded-b-md rounded-tl-md right-0 ${ dropDown ? "block" : "hidden" }` }
      onMouseLeave={ toggleDropDown }>
      <li className="border-b border-zinc-50 border-opacity-50 w-full">
        <button 
          className="flex w-full justify-end items-center py-3 pe-2 transition duration-200 hover:ease-in hover:bg-cyan-900 hover:bg-opacity-30 rounded-tl-md"
          onClick={ () => navigate('/index') }
        >
          <span className="me-3 text-zinc-50">Accueil</span>
        </button>
      </li>
      <li className="w-full border-b border-zinc-50 border-opacity-50">
        <button 
          className="flex w-full py-3 pe-2 items-center justify-end transition duration-200 hover:ease-in hover:bg-cyan-900 hover:bg-opacity-30 rounded-b-md"
          onClick={() => setOpenModal('dismissible') }>
          <span className="me-3 text-zinc-50">Déconnexion</span>
        </button>
      </li>
    </ul>
  )

  const navBar = widthSize > 640 ?
    (
      <ul className="flex">
        { MenuItems }
      </ul>
    ) :
    (
      <>
        <MenuItem dropDownItem={ true } toggleDropDown={ toggleDropDown } navigate={ navigate }>
          <NavBarDropdownIcon />
        </MenuItem>
        { dropDownItems } 
      </>
      
    )

  return (
    <>
      { navBar }
    </>
    
  )
}

export default NavBar;