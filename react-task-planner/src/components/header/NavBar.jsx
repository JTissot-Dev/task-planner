import MenuItem from "./MenuItem"
import { LogoutMenuIcon } from "../icons"
import { HomeMenuIcon } from "../icons"


const NavBar = ({setOpenModal, redirectHome}) => {

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

  return (
    <div>
      <ul className="flex">
        { MenuItems }
      </ul>
    </div>
  )
}

export default NavBar;