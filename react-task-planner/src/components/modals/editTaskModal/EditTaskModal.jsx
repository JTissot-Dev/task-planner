import { useEffect, useRef } from "react";
import axiosClient from "../../../axios-client";
import { CloseIcon } from "../../icons";
import DefaultSpinner from "../../Spinners/DefaultSpinner";
import useOutsideClick from "../../../useOutsideClick";
import { DescriptionIcon, CardIcon, PriorityIcon } from "../../icons";
import PrioritySelect from "./PrioritySelect";
import { DeadLineIcon } from "../../icons";
import DatePicker from "./DatePicker";


const EditTaskModal = ({
  taskItem,
  setTaskItem,
  loading,
  setEditTaskModal,
  updateTask,
  setHoverButton
}) => {

  useEffect(() => {
    titleRef.current.style.height = 'auto';
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    descriptionRef.current.style.height = 'auto';
    descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    setHoverButton(false);
  }, [])

  const clickOutside = useOutsideClick(() => setEditTaskModal(prev => !prev));

  const titleRef = useRef();
  const descriptionRef = useRef();

  const handleFormInput = e => {
    if (e.target) {
      if (e.target.name === 'description') {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      setTaskItem({
        ...taskItem,
        [e.target.name]: e.target.value,
      })
    } else {
      setTaskItem({
        ...taskItem,
        deadline: e
      })
    }
  }

  console.log(taskItem);
  const defaultSpinner = loading && <DefaultSpinner />;
 
  return (
    <div 
      className="fixed top-0 bg-slate-900 bg-opacity-40 flex justify-center items-start left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-xl max-h-full">
          <form
            ref={ clickOutside } 
            className="relative bg-slate-900 rounded-lg shadow border border-zinc-50 border-opacity-50 pb-8"
          >
              <div
                className="absolute flex justify-center w-full top-6 "
              >
                { defaultSpinner }
              </div>
              <div className="flex items-center justify-between p-5">
                  <div className="w-full flex items-start mb-4">
                    <CardIcon style="mt-1 me-4"/>
                    <h3 className="w-full ms-1 me-3 text-md font-medium text-zinc-50 text-opacity-90">
                      <textarea
                        name="title"
                        rows="1"
                        ref={ titleRef }
                        className="max-h-32 pb-0.5 w-full text-lg font-bold resize-none overflow-y-hidden flex flex-col flex-grow p-0 bg-transparent hover:cursor-pointer hover:bg-slate-800 hover:bg-opacity-50 hover:ease-in-out transition duration-200 rounded-sm border-0 focus:bg-slate-800 focus:bg-opacity-50 focus:ring-purple-600 focus:border-purple-600 px-0 focus:px-3"
                        value={ taskItem.title }
                        onChange={ handleFormInput }
                      >
                        { taskItem.title }
                      </textarea>
                    </h3>
                  </div>
                  <button 
                    type="button" 
                    className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 -me-1 inline-flex justify-center items-center hover:bg-zinc-50 mb-3" 
                    onClick={() => setEditTaskModal(false)}>
                      <CloseIcon />
                      <span className="sr-only">Close modal</span>
                  </button>
              </div>
              <div className="w-full mb-6">
                <div className="ms-5 mt-5 mb-2 flex items-center text-md font-bold text-zinc-50 text-opacity-90">
                  <PriorityIcon />
                  <label
                    className="ms-5"
                  >
                    Priorité
                  </label>
                </div>
                <div className="w-full px-5 sm:px-16">
                  < PrioritySelect taskItem={ taskItem } />
                </div>
              </div>
              <div className="pt-4 space-y-2 w-full">
                <div className="ms-5 flex items-center">
                  <DescriptionIcon />
                  <label
                    className="ms-6 block text-md font-bold text-zinc-50 text-opacity-90"
                  >
                    Description
                  </label>
                </div>
                <div className="w-full px-5 sm:px-16">
                  <textarea
                        name="description"
                        rows="1"
                        placeholder="Saisir une description..."
                        ref={ descriptionRef }
                        className={`${taskItem.description ? "bg-transparent hover:cursor-pointer px-0 focus:px-2.5 -mb-8 focus:mb-0 -mt-2 focus:mt-0" : " bg-slate-800" } w-full text-zinc-50 text-opacity-90 text-sm resize-none overflow-y-hidden flex flex-col flex-grow rounded-md border-0 focus:bg-slate-800 focus:bg-opacity-50 focus:ring-purple-600 focus:border-purple-600 pb-8`}
                        value={ taskItem.description }
                        onChange={ handleFormInput }
                  >
                    { taskItem.description }
                  </textarea>
                </div>
              </div>

              <div className="py-4 space-y-2 w-full">
                <div className="ms-5 mt-6 flex items-center">
                  <DeadLineIcon />
                  <label
                    className="ms-6 block text-md font-bold text-zinc-50 text-opacity-90"
                  >
                    Echéance
                  </label>
                </div>
                <div className="w-full px-5 sm:px-16">
                  <DatePicker handleFormInput={ handleFormInput } deadline={ taskItem.deadline }/>
                </div>
              </div>
          </form>
      </div>
    </div>

  )
}

export default EditTaskModal;