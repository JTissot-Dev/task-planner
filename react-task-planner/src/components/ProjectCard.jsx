import { useNavigate } from "react-router-dom";
import { AddProjectIcon } from "./icons";

const ProjectCard = ({addProject, projectId, projectName}) => {

  if (projectName) {
    projectName = projectName.length > 17 ? `${projectName.substring(0,17)}...` : projectName
  }

  const navigate = useNavigate();

  const handleProject = projectId => {
    if (projectId) {
      navigate(`/project/${projectId}`)
    }
  }
  
  const cardTitle = addProject ? 
    (
    <div className="flex items-center justify-center">
      <AddProjectIcon style="text-zinc-50 text-opacity-70 text-gray-600 w-3 h-3 -ml-5 mr-3"/>
      <h5 className="text-md font-bold tracking-tight text-zinc-50 text-opacity-70">
        Nouveau projet
      </h5>
    </div>
    ) :
    (
    <h5 className="text-md font-bold tracking-tight text-zinc-50 text-opacity-90">
      {  projectName }
    </h5>
    )
  
  return (
    <button 
      className="w-full"
      onClick={() => handleProject(projectId) }
    >
      <div className="bg-slate-950 border border-zinc-50 border-opacity-50 transition duration-200 hover:ease-in-out rounded-lg opacity-75 hover:opacity-90">
              <img 
                className="rounded-t-lg h-44 sm:h-36 w-full border-b border-zinc-50 border-opacity-50" 
                src="/image/ProjectIllustration.jpg" 
                alt="image projet" />
          <div className="p-5">
              { cardTitle }
          </div>
      </div>
    </button>
  )
}

export default ProjectCard;