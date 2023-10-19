import { AddProjectIcon } from "./icons";

const SideBar = () => {
  return (
      <aside id="default-sidebar" className="fixed top:0 left:0 z-40 h-screen hidden sm:flex" aria-label="Sidebar">
        <div className="h-full sm:w-64 px-3 py-4 overflow-y-auto bg-slate-500 bg-opacity-20 shadow-slate-300 shadow-xl">
          <div className="mt-20 pb-2 border-b border-gray-500">
            <h3 className="font-bold">
              Mes projets
            </h3>
          </div>
          <ul className="mt-10 space-y-2 font-medium text-gray-900">
            <li>
                <button className="flex z-10 items-center w-full p-2 transition duration-200 ease-out hover:ease-in text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <AddProjectIcon />
                  <span className="ml-3">Créer un projet</span>
                </button>
            </li>
          </ul>
        </div>
      </aside>
  )
}

export default SideBar;