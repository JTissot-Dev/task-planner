import { Alert } from "flowbite-react";

const ErrorAlert = ({message, dismissAlert}) => {
  return(
    <Alert
      color="failure"
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

export default ErrorAlert;