import { Button, Modal } from "flowbite-react";

const LogoutModal = ({openModal, setOpenModal, logout}) => {
  


  return (
    <>
      <Modal
        dismissible
        className=""
        show={openModal === 'dismissible'}
        onClose={() => setOpenModal(undefined)}>
        <Modal.Header>Déconnexion</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Êtes-vous sûr de vouloir quitter l'application ?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
            <Button
              className="w-32"
              gradientDuoTone="purpleToBlue"
              onClick={() => logout()}>
                Confirmer
            </Button>
            <Button
              className="w-32 hover:text-purple-600"
              color="light" 
              onClick={() => setOpenModal(undefined)}>
              Annuler
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LogoutModal;