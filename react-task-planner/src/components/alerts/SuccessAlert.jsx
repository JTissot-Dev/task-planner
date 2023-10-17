import { Alert } from "flowbite-react";

const SuccessAlert = ({dismissAlert}) => {
  return(
    <Alert
      color="success"
      onDismiss={dismissAlert}
      className="h-10 justify-center"
    >
      <span>
        <p>
          Vos informations ont bien été mises à jour
        </p>
      </span>
    </Alert>
  )
}

export default SuccessAlert;