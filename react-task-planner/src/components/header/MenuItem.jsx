const MenuItem = ({children, index, setOpenModal, redirectHome, toggleSideBar, sideBar}) => {

  const handleMenu = () => {
    if (index === 0) {
      redirectHome();
    } else if (index === 1) {
      setOpenModal('default');
    } else {
      toggleSideBar();
    }
  }

  return (
    <div 
      className={ !sideBar ? 
        "hover:border-b-2 hover:border-cyan-400 hover:border-opacity-90 h-14" :
         "flex items-center"}>
      <button
        onClick={ handleMenu }
        className={`${!sideBar ? "h-14 px-5": "flex items-center justify-center ms-5 bg-gray-500 bg-opacity-40 hover:bg-opacity-70  z-50 p-2 rounded-full"} `}
      >
        { children }
      </button>
    </div>

  )
}

export default MenuItem;