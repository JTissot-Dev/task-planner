import { useState, useEffect } from "react";
import { EditIcon } from "./icons";
import EditTaskModal from "./modals/editTaskModal/EditTaskModal";
import DeleteTaskModal from "./modals/DeleteTaskModal";
import ErrorAlert from "./alerts/ErrorAlert";
import axiosClient from "../axios-client";
import { DeleteIcon } from "./icons";
import { DeadLineIcon } from "./icons";


const TaskItem = ({task, setTasks, setErrorNotification}) => {

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
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
      prevTitle: task.title,
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

  const toggleHoverButton = () => {
    if (!editTaskModal) {
      setHoverButton(prev => !prev);
    }
  }

  const getPriorityStyle = () => {
    switch (taskItem.priority) {
      case 'Basse':
        return 'border-green-600 border-t-2 border-opacity-70';
      case 'Moyenne':
        return 'border-yellow-600 border-t-2 border-opacity-70';
      case 'Haute':
        return 'border-red-600 border-t-2 border-opacity-60';
      default:
        return 'border-slate-800 border-t-2 border-opacity-0';
    }
  }

  const getDeadLineLabel = () => {
    const deadLineSplit = taskItem.deadline.split('-');
    const deadlineLabel = `${deadLineSplit[2]}/${deadLineSplit[1]}`
    return deadlineLabel;
  }

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
      setTaskItem(data.data);
      setSubmitUpdate(false);
    })
    .catch(() => {
      const message = 'Erreur lors de la mise à jour';
      setErrorNotification(<ErrorAlert message={ message } dismissAlert={ () => setErrorNotification('') } />);
      setSubmitUpdate(false);
    })
  }

  const deleteTask = () => {
    setDeleteLoading(true);
    axiosClient.delete(`/task/${taskItem.id}`)
    .then(() => {
      setTasks(prev => prev.filter(prevTask => prevTask.id != taskItem.id))
      setTasks(prev => prev.map(prevTask => {
          return {
            ...prevTask,
            position: prevTask.position > taskItem.position ? prevTask.position -1 : prevTask.position
          }
      }));
      setDeleteLoading(false);
      setDeleteTaskModal(false);
    })
    .catch(() => {
      setDeleteLoading(false);
      setDeleteTaskModal(false);
      const message = 'Erreur lors de la suppression';
      setErrorNotification(<ErrorAlert message={ message } dismissAlert={ () => setErrorNotification('') } />);
    })
  }


  return (
    <div
      className={`${getPriorityStyle()} relative my-2 px-5 pt-3.5 pb-11 w-full flex justify-start text-sm bg-slate-800 bg-opacity-50 rounded-md shadow-md shadow-slate-950 hover:bg-slate-800 hover:bg-opacity-60 hover:ease-in-out transition duration-200`}
      onMouseEnter={ toggleHoverButton }
      onMouseLeave={ toggleHoverButton }
    > 
        <h4 className="w-44 break-words whitespace-pre-line">
          { taskItem.title ? taskItem.title : task.title}
        </h4>
      {
      hoverButton &&
        <div className="z-50 absolute top-1 end-1">
          <button
            className="p-2.5 hover:bg-slate-950 hover:ease-in-out transition duration-200 rounded-lg"
            onClick={ () => setEditTaskModal(true) }
          >
            <EditIcon />
          </button>
          <button
            className="p-2.5 hover:bg-slate-950 hover:ease-in-out transition duration-200 rounded-lg"
            onClick={ () => setDeleteTaskModal(true) }
          >
            <DeleteIcon style="w-3 h-3"/>
          </button>
        </div>
      }
      {
        taskItem.deadline &&
          <div className="z-40 text-xs font-extralight flex items-center absolute bottom-3 end-4">
            <DeadLineIcon style="w-3 h-3 me-1.5" />
            { getDeadLineLabel() }
          </div>
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
    
      {
        deleteTaskModal &&
        <DeleteTaskModal 
          loading={ deleteLoading }
          deleteTask={ deleteTask }
          setDeleteTaskModal={ setDeleteTaskModal }
          setHoverButton={ setHoverButton }
        />
      }
    </div>
  )
}

export default TaskItem;