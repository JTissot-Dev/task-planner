import MenuItem from "./MenuItem"
import { LogoutMenuIcon } from "../icons"
import { HomeMenuIcon } from "../icons"
import { NavBarDropdownIcon } from "../icons"
import { useState } from "react"

const NavBar = ({setOpenModal, redirectHome, widthSize}) => {


  const [dropDown, setDropDown] = useState(false)

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
          redirectHome={ redirectHome }>
          { MenuIcon }
        </MenuItem>
      </li>
    )  
  })

  const dropDownItems = (
    <ul className={ `bg-gray-800 shadow-gray-500 bg-opacity-50 shad shadow-md flex flex-col w-44 fixed top-16 rounded-b-md rounded-tl-md right-0 ${ dropDown ? "block" : "hidden" }` }
      onMouseLeave={ toggleDropDown }>
      <li className="border-b border-zinc-50">
        <button className="flex w-full py-2 ps-2 transition duration-200 hover:ease-in hover:bg-cyan-900 hover:bg-opacity-30 rounded-tl-md">
          <HomeMenuIcon />
          <span className="ml-3 text-zinc-50">Accueil</span>
        </button>
      </li>
      <li className="">
        <button className="flex w-full py-2 ps-2 transition duration-200 hover:ease-in hover:bg-cyan-900 hover:bg-opacity-30 rounded-b-md"
          onClick={() => setOpenModal('dismissible') }>
          <LogoutMenuIcon />
          <span className="ml-3 text-zinc-50">Déconnexion</span>
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
        <MenuItem dropDownItem={ true } toggleDropDown={ toggleDropDown }>
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