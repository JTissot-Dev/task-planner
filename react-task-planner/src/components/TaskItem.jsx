import { useState, useEffect } from "react";
import { EditIcon } from "./icons";
import EditTaskModal from "./modals/editTaskModal/EditTaskModal";

const TaskItem = ({task}) => {

  const [taskItem, setTaskItem] = useState({
    id: null,
    title: '',
    prevTitle: '',
    description: '',
    deadline: '',
    position: null,
    priority: '',
    listId: null
  });

  const [editTaskModal, setEditTaskModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [hoverButton, setHoverButton] = useState(false);

  useEffect(() => {
    setTaskItem({
      id: task.id,
      title: task.title,
      prevTitle: task.title,
      description: task.description,
      deadline: task.deadline,
      position: task.position,
      priority: task.priority,
      listId: task.listId
    });
  }, [])

  return (
    <div
      className="relative my-2 p-5 w-full flex justify-start text-sm bg-slate-800 bg-opacity-50 rounded-md shadow-md shadow-slate-950 hover:bg-slate-800 hover:bg-opacity-60 hover:ease-in-out transition duration-200"
      onMouseEnter={ () => setHoverButton(true) }
      onMouseLeave={ () => setHoverButton(false) }
    > 
        <h4 className="w-44 break-words whitespace-pre-line">
          { taskItem.title }
        </h4>
      {
      hoverButton &&
        <button
          className="p-3 z-50 absolute top-1 end-1 hover:bg-slate-950 hover:ease-in-out transition duration-200 rounded-full"
          onClick={ () => setEditTaskModal(true) }
        >
          <EditIcon />
        </button> 
      }

      { 
      editTaskModal &&  
        <EditTaskModal 
          loading={ loading } 
          setEditTaskModal={setEditTaskModal}
          taskItem={ taskItem }
          setTaskItem={ setTaskItem }
          setHoverButton={ setHoverButton }
        />
      }
    </div>
  )
}

export default TaskItem;