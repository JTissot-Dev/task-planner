import { Button } from "flowbite-react";
import { CloseIcon } from "../icons";
import DefaultSpinner from "../Spinners/DefaultSpinner";
import useOutsideClick from "../../useOutsideClick";


const DeleteListModal = ({loading, deleteList, setDeleteListModal}) => {
   
  const clickOutside = useOutsideClick(() => setDeleteListModal(prev => !prev));

  const handleSubmit = e => {
    e.preventDefault();
    deleteList();
  }

  const defaultSpinner = loading && <DefaultSpinner />;
 
  return (
    <div 
      className="fixed top-0 bg-slate-900 bg-opacity-40 flex justify-center items-start md:items-center left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-lg max-h-full">
          <form
            ref={ clickOutside } 
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
                      Supprimer une liste
                  </h3>
                  <button 
                    type="button" 
                    className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-zinc-50" 
                    onClick={() => setDeleteListModal(false)}>
                      <CloseIcon />
                      <span className="sr-only">Close modal</span>
                  </button>
              </div>
              
              <div className="p-6 border-y border-zinc-50 border-opacity-50 pt-4 space-y-2">
                <p>Souhaitez-vous vraiment supprimer la liste?</p>
              </div>
              
              <div className="flex items-center justify-end py-4 px-6 rounded-b dark:border-gray-600">
                  <Button
                    type="submit"
                    className="w-24 me-4"
                    gradientDuoTone="purpleToBlue"
                  >
                      Confirmer
                </Button>
                  <button 
                    type="button" 
                    className="w-24 bg-slate-950 border border-zinc-50 border-opacity-50 text-zinc-50 text-opacity-90 hover:bg-slate-900 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={() => setDeleteListModal(false)}
                  >
                    Annuler
                  </button>
              </div>
          </form>
      </div>
    </div>

  )
}

export default DeleteListModal;