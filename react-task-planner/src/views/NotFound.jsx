import { NotFoundIcon } from "../components/icons";

const NotFound = () => {
  return (
    <div 
      className="mb-32 mx-5 flex flex-col justify-center items-center text-xl text-zinc-50 text-opacity-90"
    >
      <NotFoundIcon />
      <h1 
        className="mt-5"
      > 
        The request URL was not found on this server.
      </h1>
      
    </div>
  )
}

export default NotFound;