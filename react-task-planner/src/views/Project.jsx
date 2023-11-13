import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import List from "../components/List";
import LargeSpinner from "../components/Spinners/LargeSpinner";
import { BurgerMenuProjectIcon } from "../components/icons";
import { DeleteIcon } from "../components/icons";
import useOutsideClick from "../useOutsideClick";
import ErrorAlert from "../components/alerts/ErrorAlert";
import DeleteProjectModal from "../components/modals/DeleteProjectModal";
import AddListItem from "../components/AddListItem";

const Project = () => {

  let { projectId } = useParams();

  const {
    sideBar, 
    setConnectionError, 
    sideProjects, 
    setSideProjects,
    setCurrentProject} = useStateContext();

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [project, setProject] = useState({});
  const [projectName, setProjectName] = useState('');
  const [errorNotification, setErrorNotification] = useState('');
  const [deleteProjectModal, setDeleteProjectModal] = useState(false);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [addList, setAddList] = useState(false);
  const clickOutside = useOutsideClick(() => setDropDownMenu(prev => !prev))
  const navigate = useNavigate();

  useEffect(() => {
    getProject()
    getLists();
  }, [projectId]);

  const getProject = () => {
    axiosClient.get(`/project/${projectId}`)
      .then(({data}) => {
        setProject(data.data);
        setProjectName(data.data.name);
      })
      .catch(() => {
        setLoading(false);
        setConnectionError(prev => !prev);
      })
    }

  const getLists = () => {
    setLoading(true);
      axiosClient.get(`/list?project-id=${projectId}`)
        .then(({data}) => {
          setLists(data.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setConnectionError(prev => !prev);
        })
    }

  console.log(lists)

  const handleProjectName = e => setProjectName(e.target.value);
    
  const updateProject = () => {
    if (projectName) {
      const payload = {
        name: projectName
      };
      axiosClient.put(`/project/${project.id}`, payload)
      .then(({data}) => {
        setProject({
          ...project,
          name: data.data.name
        });
        const updatedSideProject = sideProjects.map(sideProject => {
          return sideProject.id === data.data.id ?
          {
            ...sideProject,
            name: data.data.name
          } :
          sideProject;
        })
        setSideProjects(updatedSideProject);
      })
      .catch(() => {
        const message = 'Erreur lors de la mise à jour du projet';
        setErrorNotification(<ErrorAlert message={ message } dismissAlert={ () => setErrorNotification('') } />)
      })
    } else {
      setProjectName(project.name);
    }
  }

  const deleteProject = () => {
    setDeleteLoading(true);
    axiosClient.delete(`/project/${project.id}`)
    .then(() => {
      setSideProjects(prev => prev.filter(prevProject => prevProject.id != project.id));
      setCurrentProject({});
      navigate("/index");
    })
    .catch(() => {
      setDeleteLoading(false);
      setDeleteProjectModal(false);
      const message = 'Erreur lors de la suppression du projet';
      setErrorNotification(<ErrorAlert message={ message } dismissAlert={ () => setErrorNotification('') } />);
    })
  }
  
  const spinner = loading && <LargeSpinner />;
  
  const dropDownProjectMenu = dropDownMenu &&
    (
    <ul 
      className="bg-slate-950 border border-zinc-50 border-opacity-50 rounded-md"
      ref = { clickOutside }
    >
      <li>
        <button 
          className="flex p-2 items-center justify-center hover:bg-slate-800 hover:bg-opacity-50 hover:ease-in-out transition duration-200 w-full sm:w-fit"
          onClick={() => setDeleteProjectModal(true) }
        >
          <DeleteIcon />
          <p className="ms-2 text-sm">Supprimer le projet</p>
        </button>
      </li>
    </ul>
    )
  

  return (
    <div 
      className={`h-screen pb-5 relative text-zinc-50 text-opacity-90 flex flex-col min-w-full mx-3 ${ sideBar ? "px-5" : "px-5 sm:px-20" }`}
    >
      <div className="absolute z-50 top-64 start-1/2">
        { spinner }
      </div>
      <div className="relative flex justify-between h-12 items-center mt-20 rounded-lg bg-slate-800 bg-opacity-40">
        <h1 className="h-full">
          <input
            type="text"
            className="h-full w-52 sm:w-80 bg-transparent hover:cursor-pointer hover:bg-slate-800 hover:bg-opacity-50 hover:ease-in-out transition duration-200 rounded-lg py-0 border-0 focus:bg-slate-800 focus:bg-opacity-50 focus:ring-purple-600 focus:border-purple-600"
            value={ projectName }
            onChange={ handleProjectName }
            onBlur={ updateProject }
          >
          </input>
        </h1>
        <button 
          className="hover:bg-slate-800 hover:bg-opacity-50 hover:ease-in-out transition duration-200 h-full rounded-md p-2.5"
          onClick={() => setDropDownMenu(prev => !prev) }
        >
          <BurgerMenuProjectIcon />
        </button>
        <div className="absolute top-14 end-0 w-full sm:w-fit">
          { dropDownProjectMenu }
        </div>
      </div>
      <div className="h-10">
          { errorNotification }
      </div>
      <div 
        className="flex h-screen pt-1 pb-8 overflow-y-hidden overflow-x-auto scrollbar scrollbar-track-zinc-200 scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        { 
          lists &&
          lists.map(list => {
            return <List 
                      key={ list.id } 
                      list={ list }
                      setLists={ setLists } 
                      setErrorNotification={ setErrorNotification } 
                    />
          })
        }
        {
          !loading && 
            <AddListItem 
              addList={ addList } 
              setAddList={ setAddList } 
              projectId={ project.id }
              lists={ lists } 
              setLists={ setLists }
              setErrorNotification={ setErrorNotification }
            />
        }
      </div>

      {
        deleteProjectModal && 
          <DeleteProjectModal 
            loading={deleteLoading}
            deleteProject={ deleteProject } 
            setDeleteProjectModal={ setDeleteProjectModal }
          />
      }
    </div>
  )
}

export default Project;