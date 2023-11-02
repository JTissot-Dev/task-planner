import { AddProjectIcon } from "./icons";
import { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosClient from "../axios-client";
import DefaultSpinner from "./Spinners/DefaultSpinner";
import { AngleDownIcon } from "./icons";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";


const SideBar = () => {

  const [projects, setProjects] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);

  const {user} = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    getProjets();
  }, [])

  const getProjets = () => {
    setLoading(true);
    axiosClient.get(`/project?user-id=${user.id}`)
      .then(({data}) => {
        setProjects(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  const getMoreProjects = () => {
    setLoading(true);
      axiosClient.get(`/project?user-id=${user.id}&page=${currentPage}`)
      .then(({data}) => {
        setProjects((prevData) => [...prevData, ...data.data]);
        setCurrentPage((prevPage) => prevPage + 1); 
        setLoading(false);
        data.data.length > 0 ? setHasMore(true): setHasMore(false);
      })
      .catch(() => {
        setLoading(false);
      })
  }


  const handleProject = (projectId) => {
      navigate(`/project/${projectId}`);
    }

  const projectItems = projects.map((projectItem, index) => {
    return (
      <div key={ index } className="my-2">
        <button
          onClick={() => handleProject(projectItem.id)}
          className="flex z-10 bg-slate-800 bg-opacity-50 items-center w-full p-2 transition duration-200 ease-out hover:ease-in text-gray-900 rounded-lg hover:bg-opacity-80  group"
        >
         <span className="ml-7 text-zinc-50 text-opacity-90">{ projectItem.name }</span>
        </button>
      </div>
    )
  })

  const spinner = loading && <DefaultSpinner />;
  const getMoreProjectButton = (!loading && hasMore && projects.length >= 7) &&
    (
      <button className="flex flex-col z-10 items-center justify-center w-full px-2 py-2 transition duration-200 ease-out hover:ease-in rounded-lg hover:bg-slate-800 hover:bg-opacity-50 group"
              onClick={getMoreProjects}
      >
        <AngleDownIcon />
      </button>
    )

  return (
      <aside id="default-sidebar" className="fixed top:0 left:0 z-40 hidden mt-14 sm:flex scroll-y-1" aria-label="Sidebar">
        <div 
          className="sm:w-64 h-screen px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-track-zinc-200 scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full bg-opacity-0 border-r border-zinc-50 border-opacity-50"
          id="scrollableDiv"
          >
          <div className="mt-4 pb-2 border-b border-opacity-50 text-zinc-50 text-opacity-90 border-zinc-50 bg-local hover:bg-fixed">
            <h3 className="font-bold">
              Mes projets
            </h3>
          </div>
          <button className="flex z-10 items-center w-full mt-5 px-2 py-2 transition duration-200 ease-out hover:ease-in text-gray-900 rounded-lg hover:bg-purple-600 hover:bg-opacity-40 group">
            <AddProjectIcon style="text-zinc-50 text-opacity-90 w-3 h-3"/>
            <span className="ml-3 text-zinc-50 text-opacity-90">Nouveau projet</span>
          </button>
          <div
            className="mb-14 mt-2 space-y-2 font-medium text-gray-900"
          >
            <InfiniteScroll
                dataLength={projects.length}
                next={getMoreProjects}
                hasMore={hasMore}
                scrollableTarget="scrollableDiv"
              >
                  { projectItems }
              </InfiniteScroll>
              { getMoreProjectButton }
              <div className="flex justify-center">
                { spinner }
              </div>
          </div>
        </div>
      </aside>
  )
}

export default SideBar;