const SearchBarProjects = ({setProjectName, updateProjects}) => {

  const handleSearchProjectsSubmit = e => {
    e.preventDefault();
    updateProjects()
  }

  const handleProjectName = e => {
    setProjectName(e.target.value);
  }

  return ( 
    <form 
      onSubmit={ handleSearchProjectsSubmit }
    >
        <div className="relative  mt-2 md:mt-0">
            <input 
              type="search" 
              id="default-search" 
              className="block w-full md:w-72 lg:w-80 xl:w-96 h-9 p-4 pl-2 text-sm border border-zinc-50 border-opacity-50 text-gray-900 borde rounded-md bg-gray-50 focus:ring-purple-600 focus:border-purple-600" 
              placeholder="Projet"
              onChange={ handleProjectName }
            ></input>
            <button 
              type="submit" 
              className="text-white absolute right-0 bottom-0 bg-slate-950 border border-zinc-50 border-opacity-50 hover:bg-purple-900 transition duration-200 hover:ease-in-out focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-r-md text-sm px-2 h-9"
            >
              Filtrer
            </button>
        </div>
    </form>
  )
}

export default SearchBarProjects;