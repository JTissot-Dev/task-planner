import { BugIcon } from "../icons";


const ConnectionAlert = () => {
  return (
    <div className="absolute px-5 w-full top-14 mt-2 z-50">
      <div
      className="w-full text-sm sm:text-base flex items-center p-5 font-light text-zinc-50 text-opacity-90 rounded-lg bg-slate-800 bg-opacity-70 backdrop-blur"
      >
        <BugIcon />
        <p className="ms-2">
          Une erreur est survenue, veuillez actualiser la page
        </p>
      </div>
    </div>

  )
}

export default ConnectionAlert;