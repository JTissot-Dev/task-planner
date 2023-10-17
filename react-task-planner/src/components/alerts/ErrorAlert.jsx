import { Alert } from "flowbite-react";

const ErrorAlert = ({dismissAlert}) => {
  return(
    <Alert
      color="failure"
      onDismiss={dismissAlert}
      className="h-10 justify-center"
    >
      <span>
        <p>
          Erreur lors de la mise à jour des informations
        </p>
      </span>
    </Alert>
  )
}

export default ErrorAlert;