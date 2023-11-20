import { useState, useEffect, useRef } from "react";
import { CloseIcon } from "../../icons";
import useOutsideClick from "../../../useOutsideClick";
import { DescriptionIcon, CardIcon, PriorityIcon } from "../../icons";
import PrioritySelect from "./PrioritySelect";
import { DeadLineIcon } from "../../icons";
import DatePicker from "./DatePicker";


const EditTaskModal = ({
  setSubmitUpdate,
  setHoverButton,
  setEditTaskModal,
  formInput,
  setFormInput
}) => {
  
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    descriptionRef.current.style.height = 'auto';
    descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    setHoverButton(false);
  }, [])

  useEffect(() => {
    titleRef.current.style.height = 'auto';
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  }, [titleRef, formInput.title])

  const handleTextAreas = e => {
    if (e.target) {
      if (['description', 'title'].includes(e.target.name)) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      setFormInput({
        ...formInput,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleNoneTitle = e => {
    if (!e.target.value) {
      setFormInput({
        ...formInput,
        title: formInput.prevTitle
      })
    } else {
      setFormInput({
        ...formInput,
        prevTitle: formInput.title
      })
    }
  }

  const handleSelect = e => {
    if (e && e.value) {
      setFormInput({
        ...formInput,
        priority: e.value
      })
    } else {
      setFormInput({
        ...formInput,
        priority: null
      })
    }
  }

  const handleDeadline = e => {
    const splitedDate = e.toLocaleDateString().split('/');
    const date = `${splitedDate[2]}-${splitedDate[1]}-${splitedDate[0]}`
    setFormInput({
      ...formInput,
      deadline: date
    })
  }

  const handleClearDeadline = () => {
    console.log('toto');
    setFormInput({
      ...formInput,
      deadline: null
    })
  }

  const handleSubmit = () => {
    setEditTaskModal(false);
    setSubmitUpdate(true);
  }

  const clickOutside = useOutsideClick(handleSubmit);
 
  return (
    <div 
      className="fixed top-0 bg-slate-900 bg-opacity-40 flex justify-center items-start left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div 
        className="relative w-full max-w-xl max-h-full"
      >
          <form
            className="relative bg-slate-900 rounded-lg shadow border border-zinc-50 border-opacity-50 pb-8"
            ref={ clickOutside }
          >
            <div className="flex items-start justify-between p-5">
                <div className="w-full flex items-start mb-4">
                  <CardIcon style="mt-1 me-4"/>
                  <h3 className="w-full ms-1 me-3 text-md font-medium text-zinc-50 text-opacity-90">
                    <textarea
                      name="title"
                      rows="1"
                      ref={ titleRef }
                      className="max-h-32 pb-0.5 w-full text-lg font-bold resize-none overflow-y-hidden flex flex-col flex-grow p-0 bg-transparent hover:cursor-pointer hover:bg-slate-800 hover:bg-opacity-50 hover:ease-in-out transition duration-200 rounded-sm border-0 focus:bg-slate-800 focus:bg-opacity-50 focus:ring-purple-600 focus:border-purple-600 px-0 focus:px-3"
                      value={ formInput.title }
                      onChange={ handleTextAreas }
                      onBlur={ handleNoneTitle }
                    >
                      { formInput.title }
                    </textarea>
                  </h3>
                </div>
                <button 
                  type="button" 
                  className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 -me-1 inline-flex justify-center items-center hover:bg-zinc-50 mb-3" 
                  onClick={ handleSubmit }
                >
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
                  < PrioritySelect priority={ formInput.priority } handleSelect={ handleSelect }/>
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
                        className={`${formInput.description ? "bg-transparent hover:cursor-pointer px-0 focus:px-2.5 -mb-8 focus:mb-0 -mt-2 focus:mt-0" : " bg-slate-800" } w-full text-zinc-50 text-opacity-90 text-sm resize-none overflow-y-hidden flex flex-col flex-grow rounded-md border-0 focus:bg-slate-800 focus:bg-opacity-50 focus:ring-purple-600 focus:border-purple-600 pb-8`}
                        value={ formInput.description ? formInput.description : ''}
                        onChange={ handleTextAreas }
                  >
                    { formInput.description }
                  </textarea>
                </div>
              </div>

              <div className="py-4 space-y-2 w-full">
                <div className="ms-5 mt-6 flex items-center">
                  <DeadLineIcon style="w-6 h-6"/>
                  <label
                    className="ms-6 block text-md font-bold text-zinc-50 text-opacity-90"
                  >
                    Echéance
                  </label>
                </div>
                <div className="w-full px-5 sm:px-16">
                  <DatePicker 
                    handleDeadline={ handleDeadline } 
                    deadline={ formInput.deadline }
                    handleClear={ handleClearDeadline }
                  />
                </div>
              </div>
          </form>
      </div>
    </div>

  )
}

export default EditTaskModal;