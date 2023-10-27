import { useStateContext } from "../context/ContextProvider";
import ProjectCard from "../components/ProjectCard";
import axiosClient from "../axios-client";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "../components/pagination";
import LargeSpinner from "../components/Spinners/LargeSpinner";

const Index = () => {

  const 
  {
    user, 
    sideBar, 
    projects, 
    loading, 
    projectsUrl,
    setLoading,
    setProjects,
    setProjectsUrl
  } = useStateContext();

  const [pagination, setPagination] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    getProjets();
  }, [projectsUrl])

  const getProjets = () => {
    setLoading(true);
    setTimeout(() => {
      axiosClient.get(projectsUrl)
      .then(({data}) => {
        setProjects(data.data);
        setPagination(data.meta.links);     
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      }), 1500
    })
    
  }

  const spinner = loading && <LargeSpinner />;

  const updateProjects = (currentPage) => {
    setCurrentPage(currentPage);
    setProjectsUrl(`/project?page=${currentPage}`);
  }

  // const paginationIndex = !loading && 
  //   <Pagination pagination={ pagination } updateProjects={ updateProjects }/>;
  

  return (
    <div className={`relative flex flex-col justify-between min-h-full w-full mx-3 ${ sideBar ? "px-5" : "px-5 sm:px-20" }`} >
      <div>
        <div className="border-b mt-28 border-zinc-50 border-opacity-50 flex justify-start">
          <h1 className="font-semibold text-zinc-50 text-opacity-90">
            Bienvenue à bord { user.last_name }
          </h1>
        </div>
        <div className="flex flex-col justify-between relative mt-5 rounded-md w-full">
        <div className="absolute top-1/2 start-1/2">
          { spinner }
        </div>
        <h2 className="mb-5 text-zinc-50 text-opacity-90">Vos projets</h2>
        <div 
          className={`grid ${ sideBar ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}`}>
          <ProjectCard addProject={ true }/>
          { projects.map((project, index) => {
            return <ProjectCard key={index} projectId={ project.id } projectName={ project.name } />
          }) }
        </div>
        </div>
      </div>
      <div className="w-full flex justify-center my-10">
          <Pagination pagination={ pagination } updateProjects={ updateProjects } loading={ loading }/>
      </div>
    </div>
  )
}

export default Index;