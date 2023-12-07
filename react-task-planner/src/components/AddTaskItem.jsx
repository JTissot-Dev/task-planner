import { useRef, useEffect } from "react";
import { AddProjectIcon } from "./icons"
import useOutsideClick from "../useOutsideClick";
import axiosClient from "../axios-client";
import ErrorAlert from "./alerts/ErrorAlert";

const AddTaskItem = ({
  addTask, 
  setAddTask,
  listId,
  tasks,
  setTasks,
  setErrorNotification
}) => {

  const useOutside = useOutsideClick(() => setAddTask(false));
  const inputTitle = useRef(null);

  useEffect(() => {
    if (addTask) {
      inputTitle.current.focus();
    }
  }, [addTask]);

  const handleSubmitForm = e => {
    e.preventDefault();
    setAddTask(false);
    const payload = {
      title: inputTitle.current.value,
      listId: listId,
      position: tasks.length + 1
    };
    axiosClient.post('/task', payload)
    .then(({data}) => {
      setTasks(prev => [...prev, data.data]);
    })
    .catch(() => {
      const message = 'Erreur lors de la création de la tâche';
      setErrorNotification(<ErrorAlert message={ message } dismissAlert={ () => setErrorNotification('') } />);
    })
  }

  return (
    <div 
      className="w-full my-2 grow-0 shrink-0"
    >
    {
      addTask ?
      (
        <form 
          onSubmit={ handleSubmitForm }
          className="w-full p-3 bg-slate-800 bg-opacity-50 rounded-lg"
          ref={ useOutside }>
          <input
            type="text"
            className="w-full h-8 text-gray-700 rounded-md focus:ring-purple-600 focus:border-purple-600"
            placeholder="Saisir le titre..."
            ref={ inputTitle }
            required
          >
          </input>
          <div className="flex justify-end mt-3">
            <button
              type='submit'
              className="py-1 px-3 rounded bg-purple-600 bg-opacity-50 transition duration-200 hover:ease-in-out hover:bg-opacity-70"
            >
              Valider
            </button>
          </div>
        </form>
      ) :
      (
      <button
        className="px-4 py-4 w-full flex items-center text-sm transition duration-200 hover:ease-in-out bg-slate-800 bg-opacity-50 hover:bg-purple-800 hover:bg-opacity-50 rounded-lg text-zinc-50 text-opacity-90"
        onClick={() => setAddTask(true) }
      >
        <AddProjectIcon style="text-zinc-50 text-opacity-90 w-3 h-3 me-2"/>
        Nouvelle tâche
      </button>
      )
    }
    </div>
  )
}

export default AddTaskItem;