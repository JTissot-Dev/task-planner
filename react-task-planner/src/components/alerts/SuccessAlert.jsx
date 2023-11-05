import { Alert } from "flowbite-react";

const SuccessAlert = ({message, dismissAlert}) => {
  return(
    <Alert
      color="success"
      onDismiss={dismissAlert}
      className="h-10 justify-center"
    >
      <span>
        <p>
          { message }
        </p>
      </span>
    </Alert>
  )
}

export default SuccessAlert;