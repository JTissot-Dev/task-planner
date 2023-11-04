import { useState } from "react";
import { Button } from "flowbite-react";
import { CloseIcon } from "../icons";
import { useStateContext } from "../../context/ContextProvider";
import DefaultSpinner from "../Spinners/DefaultSpinner";

const CreateProjectModal = () => {
  
  const {loading, setCreateProjectModal, createProject} = useStateContext(); 
  const [projectName, setProjectName] = useState('');

  const handleProjectName = e => {
    setProjectName(e.target.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    createProject(projectName);
  }

  const defaultSpinner = loading && <DefaultSpinner />;
 
  return (
    <div 
      className="fixed top-0 bg-slate-900 bg-opacity-40 flex justify-center items-start md:items-center left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-lg max-h-full">
          <form 
            className="relative bg-slate-900 rounded-lg shadow border border-zinc-50 border-opacity-50"
            onSubmit={ handleSubmit }
          >
              <div
                className="absolute flex justify-center w-full top-6 "
              >
                { defaultSpinner }
              </div>
              <div className="flex items-center justify-between p-5 rounded-t">
                  <h3 className="text-md font-medium text-zinc-50 text-opacity-90">
                      Nouveau projet
                  </h3>
                  <button 
                    type="button" 
                    className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-zinc-50" 
                    onClick={() => setCreateProjectModal(false)}>
                      <CloseIcon />
                      <span className="sr-only">Close modal</span>
                  </button>
              </div>
              
              <div className="p-6 pt-4 space-y-2">
                <label 
                htmlFor="project-name" 
                className="block text-sm font-light text-zinc-50 text-opacity-90"
                >
                  Nom du projet
                  </label>
                <input 
                type="text" 
                id="project-name" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2" 
                value={ projectName }
                onChange={ handleProjectName }
                required>
                </input>
              </div>
              
              <div className="flex items-center justify-end p-6 rounded-b dark:border-gray-600">
                  <Button
                    type="submit"
                    className="w-24 me-4"
                    gradientDuoTone="purpleToBlue"
                  >
                      Valider
                </Button>
                  <button 
                    type="button" 
                    className="w-24 bg-slate-950 border border-zinc-50 border-opacity-50 text-zinc-50 text-opacity-90 hover:bg-slate-900 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={() => setCreateProjectModal(false)}
                  >
                    Annuler
                  </button>
              </div>
          </form>
      </div>
    </div>

  )
}

export default CreateProjectModal;