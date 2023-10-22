import { Card } from "flowbite-react";
import { AddProjectIcon } from "./icons";

const ProjectCard = ({addProject, projectId, projectName}) => {

  if (projectName) {
    projectName = projectName.length > 17 ? `${projectName.substring(0,17)}...` : projectName
  }
  
  const cardTitle = addProject ? 
    (
    <div className="flex items-center justify-center">
      <AddProjectIcon style="text-gray-600 w-3 h-3 -ml-5 mr-3"/>
      <h5 class="text-md font-bold tracking-tight text-gray-600 dark:text-white">
        Nouveau projet
      </h5>
    </div>
    ) :
    (
    <h5 class="text-md font-bold tracking-tight text-gray-900 dark:text-white">
      {  projectName }
    </h5>
    )
  
  return (
    <button className=" w-full">
      <div class="bg-white border border-gray-200 rounded-lg opacity-75 hover:opacity-90">
              <img class="rounded-t-lg h-44 sm:h-36 w-full" src="/image/ProjectIllustration.jpg" alt="image projet" />
          <div class="p-5">
              { cardTitle }
          </div>
      </div>
    </button>
  )
}

export default ProjectCard;