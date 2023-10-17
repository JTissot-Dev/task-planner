import { Card } from "flowbite-react";
import { AddProjectIcon } from "./icons";

const ProjectCard = ({addProject}) => {

  let projectName = 'Project Name gedfefzefzedza';
  projectName = projectName.length > 17 ? `${projectName.substring(0,17)}...` : projectName
  const projectCard = addProject ?
    (
      <button>
      <Card
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc="/image/ProjectIllustration.jpg"
        className="w-full sm:w-52 md:w-64 xl:w-80 opacity-90 hover:opacity-100"
      > 
        <div className="flex items-center">
          <AddProjectIcon />
          <h5 className="ms-3 text-md font-bold tracking-tight text-gray-600 dark:text-white">
              Nouveau Projet
          </h5>
        </div>
      </Card>
      </button>
    ) :
    (
      <button>
        <Card
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc="/image/ProjectIllustration.jpg"
        className="w-full sm:w-52 md:w-64 xl:w-80 opacity-90 hover:opacity-100"
      >
        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
            { projectName }
        </h5>
        </Card>
      </button>
    )
  
  return (
     projectCard 
  )
}

export default ProjectCard;