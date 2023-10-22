import { useStateContext } from "../context/ContextProvider";
import ProjectCard from "../components/ProjectCard";
import axiosClient from "../axios-client";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "../components/pagination";


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
    axiosClient.get(projectsUrl)
      .then(({data}) => {
        console.log(data);
        setProjects(data.data);
        setPagination(data.meta.links);     
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  const updateProjects = (currentPage) => {
    setCurrentPage(currentPage);
    setProjectsUrl(`/project?page=${currentPage}`);
  }
  

  return (
    <div className={`flex flex-col w-full mx-3 py-5 ${ sideBar ? "px-5" : "px-5 sm:px-20" }`} >
      <div className="border-b border-gray-300 flex justify-start">
        <h1 className="font-semibold text-gray-600">
          Bienvenue à bord { user.last_name }
      
        </h1>
      </div>
      <div className="bg-zinc-300 mt-10 px-2 py-5 bg-opacity-20 w-full shadow-xl shadow-gray-200">
        <h2 className="mb-5">Vos projets</h2>
        <div 
          className={`grid ${ sideBar ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}`}>
          <ProjectCard addProject={ true }/>
          { projects.map((project, index) => {
            return <ProjectCard key={index} projectId={ project.id } projectName={ project.name } />
          }) }
        </div>
        <div className="flex justify-center mt-5">
          <Pagination pagination={ pagination } updateProjects={ updateProjects }/>
        </div>
      </div>
    </div>
  )
}

export default Index;