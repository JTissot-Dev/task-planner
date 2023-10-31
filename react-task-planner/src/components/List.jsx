import axiosClient from "../axios-client";
import { AddProjectIcon } from "./icons";
import { PreviousIcon } from "./icons";
import { NextIcon } from "./icons";

const List = ({list}) => {

  const getTasks = () => {
    axiosClient.get(`list/${list.id}`)
  }
  return (
    <div className=" h-fit grow-0 shrink-0 w-80 mb-10 me-4 border border-zinc-50 border-opacity-50 rounded-md">
      <div className="flex w-full py-1 px-3 justify-between items-center border-b border-zinc-50 border-opacity-50">
        <button
          className="p-3 hover:bg-zinc-50 transition duration-200 hover:ease-in-out hover:bg-opacity-10 rounded-full"
        >
          <PreviousIcon />
        </button>
        <h2 className="">
          { list.title }
        </h2>
        <button
          className="p-3 hover:bg-zinc-50 transition duration-200 hover:ease-in-out hover:bg-opacity-10 rounded-full"
        >
          <NextIcon />
        </button>
      </div>
      <div className="flex flex-col bg-zinc-50 bg-opacity-50">
      </div>
      <div className="w-full p-1">
        <button
          className="p-2 w-full flex items-center text-sm transition duration-200 hover:ease-in-out hover:bg-purple-800 hover:bg-opacity-50 rounded"
        >
          <AddProjectIcon style="text-zinc-50 text-opacity-90 w-3 h-3 me-2"/>
          Nouvelle tâche
        </button>
      </div>
    </div>
  )
}

export default List;