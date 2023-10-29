import { useParams } from "react-router-dom"

const Project = () => {

  let { projectId } = useParams();

  return (
    <div className="text-white mt-24">
      Mes projets { projectId }
    </div>
  )
}

export default Project;