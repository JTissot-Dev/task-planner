import { useParams } from "react-router-dom"
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import List from "../components/List";
import { AddProjectIcon } from "../components/icons";
import LargeSpinner from "../components/Spinners/LargeSpinner";

const Project = () => {

  let { projectId } = useParams();

  const {sideBar, setConnectionError} = useStateContext();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({});
  

  useEffect(() => {
    getProject()
    getLists();
  }, [projectId]);

  const getProject = () => {
      axiosClient.get(`/project/${projectId}`)
        .then(({data}) => {
          setProject(data.data);
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
  

  const spinner = loading && <LargeSpinner />;


  return (
    <div 
      className={`h-screen pb-5 relative text-zinc-50 text-opacity-90 flex flex-col min-w-full mx-3 ${ sideBar ? "px-5" : "px-5 sm:px-20" }`}
    >
        <div className="absolute z-50 top-64 start-1/2">
          { spinner }
        </div>
      <div className="bg-zinc-50 mt-24 bg-opacity-5 rounded-lg">
        <h1>
          <input
            type="text"
            className="min-w-full h-10 hover:cursor-pointer hover:bg-slate-800 hover:bg-opacity-50 transition duration-200 hover:ease-in-out rounded-lg bg-slate-800 bg-opacity-40 py-0 border-0 focus:bg-slate-800 focus:bg-opacity-50 focus:ring-purple-600 focus:border-purple-600"
            value={ project.name }
          >
          </input>
        </h1>
      </div>
      <div 
        className="flex h-screen py-8 overflow-y-hidden overflow-x-auto scrollbar scrollbar-track-zinc-200 scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        { 
          lists &&
          lists.map((list, index) => {
            return <List key={ index } list={ list }/>
          })
        }
        {
          !loading &&
          (
            <div className="w-80 grow-0 shrink-0">
            <button
              className="p-3 w-full flex items-center text-sm transition duration-200 hover:ease-in-out bg-zinc-50 bg-opacity-10 hover:bg-purple-800 hover:bg-opacity-50 rounded-xl"
            >
              <AddProjectIcon style="text-zinc-50 text-opacity-90 w-3 h-3 me-2"/>
              Nouvelle liste
            </button>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default Project;