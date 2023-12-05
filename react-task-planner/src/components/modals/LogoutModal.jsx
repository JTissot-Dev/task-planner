import { Button, Modal } from "flowbite-react";


const LogoutModal = ({openModal, setOpenModal, logout}) => {

  return (
    <>
      <Modal
        dismissible
        className=""
        show={openModal === 'dismissible'}
        onClose={() => setOpenModal(undefined)}>
        <Modal.Header
          className="bg-slate-900 rounded-t-lg border border-zinc-50 border-b-0 border-opacity-50"
        >
          <span className="text-zinc-50 text-opacity-90">
            Déconnexion
          </span>
        </Modal.Header>
        <Modal.Body
          className="bg-slate-900 border border-zinc-50 border-b-0 border-opacity-50"
        >
          <div className="space-y-6">
            <p className="text-base text-zinc-50 text-opacity-90 leading-relaxed">
              Êtes-vous sûr de vouloir quitter l'application ?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer 
          className="flex justify-end bg-slate-900 border rounded-b-lg border-zinc-50 border-opacity-50"
        >
            <Button
              className="w-32 me-2"
              gradientDuoTone="purpleToBlue"
              onClick={ logout }>
                Confirmer
            </Button>
            <button 
              type="button" 
              className="w-32 bg-slate-950 border border-zinc-50 border-opacity-50 text-zinc-50 text-opacity-90 hover:bg-slate-900 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() => setOpenModal(undefined)}
            >
              Annuler
            </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LogoutModal;