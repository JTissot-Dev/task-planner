import { AddProjectIcon } from "./icons";

const SideBar = () => {
  return (
    <>
      <aside id="default-sidebar" className="hidden sm:flex h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-2xl" aria-label="Sidebar">
        <div className="h-full sm:w-64 px-3 py-4 overflow-y-auto bg-purple-900 bg-opacity-20 dark:bg-gray-800">
          <div className="mt-20 pb-2 border-b border-gray-500">
            <h3 className="font-bold">
              Mes projets
            </h3>
          </div>
          
          <ul className="mt-10 space-y-2 font-medium text-gray-900">
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <AddProjectIcon />
                  <span className="ml-3">Créer un projet</span>
                </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default SideBar;