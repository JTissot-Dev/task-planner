import { useParams } from "react-router-dom"
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";

const Project = () => {

  let { projectId } = useParams();

  const {currentProject, setCurrentProject, sideBar} = useStateContext();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    getLists();
  }, []);

  const getLists = () => {
    setLoading(true);
    setTimeout(() => {
      axiosClient.get(`/project/${projectId}`)
        .then(({data}) => {
          setLists(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        })
    })
  }

  console.log(lists);

  return (
    <div className={`relative mt-24 text-white flex flex-col justify-between min-h-full w-full mx-3 ${ sideBar ? "px-5" : "px-5 sm:px-20" }`}>
      <div className="bg-zinc-50 bg-opacity-5 rounded-lg">
        <h1>
          <input
            type="text"
            className="w-full h-10 hover:cursor-pointer hover:bg-zinc-50 hover:bg-opacity-5 transition duration-200 hover:ease-in-out rounded-lg bg-transparent py-0 border-0 focus:bg-zinc-50 focus:bg-opacity-10 focus:ring-purple-600 focus:border-purple-600"
            value={ currentProject }
          >
          </input>
        </h1>
      </div>
      
    </div>
  )
}

export default Project;