import { AddProjectIcon } from "./icons";
import { useStateContext } from "../context/ContextProvider";

const SideBar = () => {

  const {projects} = useStateContext();

  const projectItems = projects.map((projectItem, index) => {
    return (
      <li>
        <button
          className="flex z-10 bg-zinc-300 bg-opacity-50 items-center w-full p-2 transition duration-200 ease-out hover:ease-in text-gray-900 rounded-lg hover:bg-opacity-80  group"
        >
         <span className="ml-7">{ projectItem.name }</span>
        </button>
      </li>
    )
  })

  return (
      <aside id="default-sidebar" className="fixed top:0 left:0 z-40 h-screen hidden sm:flex" aria-label="Sidebar">
        <div className="h-full sm:w-64 px-3 py-4 overflow-y-auto bg-zinc-300 bg-opacity-20 shadow-slate-300 shadow-xl">
          <div className="mt-20 pb-2 border-b border-gray-500">
            <h3 className="font-bold">
              Mes projets
            </h3>
          </div>
          <ul className="mt-10 space-y-2 font-medium text-gray-900">
            <li>
                <button className="flex z-10 items-center w-full p-2 transition duration-200 ease-out hover:ease-in text-gray-900 rounded-lg hover:bg-purple-600 hover:bg-opacity-20 group">
                  <AddProjectIcon style="text-gray-900 w-3 h-3"/>
                  <span className="ml-3">Nouveau projet</span>
                </button>
            </li>
            { projectItems }
          </ul>
        </div>
      </aside>
  )
}

export default SideBar;