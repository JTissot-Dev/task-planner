import { AddProjectIcon } from "./icons";
import { PreviousIcon } from "./icons";
import { NextIcon } from "./icons";
import TaskItem from "./TaskItem";

const List = ({list}) => {

  return (
    <div className="h-full">
      <div className="max-h-full flex flex-col justify-between grow-0 shrink-0 w-80 mb-10 me-8 rounded-xl border border-zinc-50 border-opacity-50">
        <div className="flex w-full pt-3 pb-1 px-3 justify-between items-center rounded-t-md">
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
        <div 
          className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-track-slate-500 scrollbar-thumb-slate-800 my-2 mx-1 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
        >
          {
            list.tasks &&
            list.tasks.map((task, index) => {
              return <TaskItem key={ index } task= {task} />
            })
          }
          <button
            className="mx-3 my-2 p-5 bg-slate-800 bg-opacity-50 rounded-md shadow-md shadow-slate-950 flex items-center text-sm transition duration-200 hover:ease-in-out hover:bg-purple-800 hover:bg-opacity-50"
          >
            <AddProjectIcon style="text-zinc-50 text-opacity-90 w-3 h-3 me-2"/>
            Nouvelle tâche
          </button>
        </div>
      </div>
    </div>

  )
}

export default List;