const MenuItem = ({children, index, setOpenModal, toggleSideBar, sideBar, dropDownItem, toggleDropDown, navigate}) => {


  const handleMenu = () => {
    if (index === 0) {
      navigate('/index');
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
        "transition duration-200 ease-out hover:ease-in border-b border-b-transparent hover:border-purple-600 h-14" :
         "flex items-center"}>
      <button
        onClick={ handleMenu }
        onMouseEnter={ dropDownItem && toggleDropDown }
        className={`${!sideBar ? "h-14 px-5": "transition duration-200 ease-out hover:ease-in flex items-center justify-center ms-5  hover:bg-slate-800  z-50 p-2 rounded-full"} `}
      >
        { children }
      </button>
    </div>
  )
}

export default MenuItem;