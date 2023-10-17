import { Button } from "flowbite-react";
import { useStateContext } from "../context/ContextProvider";
import ProjectCard from "../components/ProjectCard";

const Index = () => {

  const {user} = useStateContext();
  
  return (
    <div className="flex flex-col w-full px-20  mx-3 py-5">
      <div className="border-b border-gray-300 flex justify-start">
        <h1 className="font-semibold text-gray-600">
          Bienvenue à bord { user.last_name }
      
        </h1>
      </div>
      <h2 className="mt-10">Projets en cours</h2>
        <div className="flex flex-wrap gap-4 mt-5">
          <ProjectCard addProject={ true }/>
          <ProjectCard/>
          <ProjectCard/>
        </div>
      </div>
  )
}

export default Index;