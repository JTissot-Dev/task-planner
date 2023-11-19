import { useState, useEffect } from "react";
import { EditIcon } from "./icons";
import EditTaskModal from "./modals/editTaskModal/EditTaskModal";
import ErrorAlert from "./alerts/ErrorAlert";
import axiosClient from "../axios-client";


const TaskItem = ({task, setErrorNotification}) => {

  const [taskItem, setTaskItem] = useState({
    id: null,
    title: '',
    description: '',
    deadline: '',
    position: null,
    priority: '',
    listId: null
  });

  const [formInput, setFormInput] = useState({
    title: '',
    description: '',
    priority: '',
    deadline: ''
  });

  const [hoverButton, setHoverButton] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [submitUpdate, setSubmitUpdate] = useState(false); 

  useEffect(() => {
    setTaskItem({
      id: task.id,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      position: task.position,
      priority: task.priority,
      listId: task.listId
    });

    setFormInput({
      title: task.title,
      description: task.description,
      priority: task.priority,
      deadline: task.deadline
    })
  }, [])

  useEffect(() => {
    if (submitUpdate) {
      updateTask();
    }
  }, [submitUpdate])


  const updateTask = () => {
    const payload = {
      title: formInput.title,
      description: formInput.description,
      priority: formInput.priority,
      deadline: formInput.deadline,
      position: taskItem.position
    }
    axiosClient.put(`/task/${taskItem.id}`, payload)
    .then(({data}) => {
      console.log(data);
      setTaskItem(data.data);
      setSubmitUpdate(false);
    })
    .catch(() => {
      const message = 'Erreur lors de la mise à jour';
      setErrorNotification(<ErrorAlert message={ message } dismissAlert={ () => setErrorNotification('') } />);
      setSubmitUpdate(false);
    })
  }


  return (
    <div
      className="relative my-2 p-5 w-full flex justify-start text-sm bg-slate-800 bg-opacity-50 rounded-md shadow-md shadow-slate-950 hover:bg-slate-800 hover:bg-opacity-60 hover:ease-in-out transition duration-200"
      onMouseEnter={ () => setHoverButton(true) }
      onMouseLeave={ () => setHoverButton(false) }
    > 
        <h4 className="w-44 break-words whitespace-pre-line">
          { taskItem.title ? taskItem.title : task.title}
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
          setSubmitUpdate={ setSubmitUpdate } 
          setEditTaskModal={setEditTaskModal}
          formInput={ formInput }
          setFormInput={ setFormInput }
          setHoverButton={ setHoverButton }
        />
      }
    </div>
  )
}

export default TaskItem;