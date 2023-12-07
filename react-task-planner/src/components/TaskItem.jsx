import { useState, useEffect } from "react";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { EditIcon } from "./icons";
import EditTaskModal from "./modals/editTaskModal/EditTaskModal";
import DeleteTaskModal from "./modals/DeleteTaskModal";
import ErrorAlert from "./alerts/ErrorAlert";
import axiosClient from "../axios-client";
import { DeleteIcon } from "./icons";
import { DeadLineIcon } from "./icons";


const TaskItem = ({task, setTasks, setErrorNotification}) => {
  

  const [taskItem, setTaskItem] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    deadline: task.deadline,
    position: task.position,
    priority: task.priority,
    listId: task.list_id
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: taskItem.id,
    data: {
      type: "task",
      task: taskItem
    }
  });


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [formInput, setFormInput] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    deadline: task.deadline
  });

  const [hoverButton, setHoverButton] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [submitUpdate, setSubmitUpdate] = useState(false); 
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
        return 'bg-green-600 bg-opacity-70'
      case 'Moyenne':
        return 'bg-yellow-600 bg-opacity-70'
      case 'Haute':
        return ' bg-red-600 bg-opacity-60'
      default:
        return ''
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
      setTasks(prev => prev.map(prevTask => {
        if (prevTask.id === taskItem.id) {
          return {
            ...prevTask,
            title: data.data.title,
            description: data.data.description,
            deadline: data.data.deadline,
            priority: data.data.priority
          }
        } else
        return prevTask;
      }))
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
    <>
      <div
        className={`${isDragging ? 'border-2 border-purple-600 border-opacity-50' : 'hover:border-purple-600 hover:border-opacity-50 bg-slate-800 bg-opacity-50 shadow-md border-2 border-transparent'} relative my-2 px-5 pt-3.5 pb-11 w-full flex justify-start text-sm rounded-md`}     
        onMouseEnter={ toggleHoverButton }
        onMouseLeave={ toggleHoverButton }
        ref={setNodeRef} 
        style={style} 
        {...attributes} {...listeners}
      > 
        <div
          className={`${isDragging && 'opacity-0'}`}
        >
          <h4 className="w-44 break-words text-zinc-50 text-opacity-90 whitespace-pre-line">
            { taskItem.title ? taskItem.title : task.title}
          </h4>
          {
          hoverButton &&
            <div className="z-30 absolute top-1 end-1">
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
          <div className="z-20 text-xs font-extralight flex items-center absolute bottom-3 end-4 text-zinc-50 text-opacity-90">
            <div
              className={`${getPriorityStyle()} rounded-full h-3 w-10`}
            >
            </div>
            {
              taskItem.deadline &&
              <div
                className="flex items-center ms-3"
              >
                <DeadLineIcon style="w-3 h-3 me-1.5" />
                { getDeadLineLabel() }
              </div>
            }
          </div>
        </div>      
      </div>
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
            deleteTaskModal={ deleteTaskModal }
            setDeleteTaskModal={ setDeleteTaskModal }
            setHoverButton={ setHoverButton }
          />
      }
    </>


  )
}

export default TaskItem;