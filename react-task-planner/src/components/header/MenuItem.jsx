
const MenuItem = ({children, index, setOpenModal, redirectHome, toggleSideBar, sideBar, dropDownItem, toggleDropDown}) => {

  const handleMenu = () => {
    if (index === 0) {
      redirectHome();
    } else if (index === 1) {
      setOpenModal('dismissible');
    } else {
      if (!dropDownItem) {
        toggleSideBar();
      } else {
        toggleDropDown();
      }
    }
  }

  return (
    <div 
      className={ !sideBar ? 
        "transition duration-200 ease-out hover:ease-in border-b-2 border-b-transparent hover:border-cyan-400 hover:border-opacity-90 h-14" :
         "flex items-center"}>
      <button
        onClick={ handleMenu }
        onMouseEnter={ dropDownItem && toggleDropDown }
        className={`${!sideBar ? "h-14 px-5": "transition duration-200 ease-out hover:ease-in flex items-center justify-center ms-5 bg-gray-500 bg-opacity-40 hover:bg-opacity-70  z-50 p-2 rounded-full"} `}
      >
        { children }
      </button>
    </div>
  )
}

export default MenuItem;