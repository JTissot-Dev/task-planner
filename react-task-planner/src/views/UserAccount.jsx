import { useStateContext } from "../context/ContextProvider";
import { useState } from "react";
import { Button } from "flowbite-react";
import axiosClient from "../axios-client";
import SuccessAlert from "../components/alerts/SuccessAlert";
import ErrorAlert from "../components/alerts/ErrorAlert";


const UserAccount = () => {

  const {user, setUser} = useStateContext();
  const [emailLabel, setEmailLabel] = useState('Adresse e-mail');
  const [updateNotification, setUpdateNotification] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const emailHandler = e => {
    setUser({
      ...user,
      email: e.target.value
    })

    setEmailLabel(
      (!emailRegex.test(e.target.value) && e.target.value.length > 0) ?
        "Adresse e-mail invalide" :
        "Adresse e-mail"
    )
  }

  const firstNameHandler = e => {
    setUser({
      ...user,
      first_name: e.target.value
    })
  }

  const lastNameHandler = e => {
    setUser({
      ...user,
      last_name: e.target.value
    })
  }

  const formAccountSubmit = e => {
    e.preventDefault();

    const payload = {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email
    }

  const dismissAlert = () => {
    setUpdateNotification('');
  };


  axiosClient.put(`/user-account/${user.id}`, payload)
    .then(() => {
      console.log('toto');
      setUpdateNotification(<SuccessAlert dismissAlert={ dismissAlert } />);
    })
    .catch(()=> {
      setUpdateNotification(<ErrorAlert dismissAlert={ dismissAlert } />);
    })
  }


  return (
    <div className="w-full mx-3 lg:mx-52">
      <div className="mb-2 mt-28 border-b border-gray-300">
        <h1 className="font-semibold text-zinc-50 text-opacity-90">Mon compte</h1>
      </div>
      <div className="h-9 mb-10">
        { updateNotification }
      </div>
      <form 
        className="w-full"
        onSubmit={ formAccountSubmit }
      >
        <div className="relative z-0 w-full mb-10 group">
            <input 
              type="email" 
              name="floating_email" 
              id="floating_email" 
              className={ `block py-2.5 px-0 w-full text-sm text-zinc-50 text-opacity-50 bg-transparent appearance-none focus:outline-none focus:ring-0 ${ emailLabel.includes('invalide') ? 'focus:border-red-500 border-0 border-b border-red-500' : 'focus:border-purple-600 border-0 border-b border-gray-300'}  peer` } 
              placeholder=" " 
              required 
              value={ user.email }
              onChange={ emailHandler }
            />
            <label 
              htmlFor="floating_email" 
              className={ `peer-focus:font-medium absolute text-sm text-zinc-50 text-opacity-90 ${ emailLabel.includes('invalide') ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-600 peer-focus:text-purple-600'} duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6` }
            >
              { emailLabel }
            </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 mb-10">
          <div className="relative z-0 w-full mb-10 group">
              <input 
                type="text" 
                name="floating_first_name" 
                id="floating_first_name" 
                className="block py-2.5 px-0 w-full text-sm text-zinc-50 text-opacity-50 bg-transparent border-0 border-b border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-purple-600 peer" 
                placeholder=" " 
                required
                value={ user.first_name }
                onChange={ firstNameHandler }
              />
              <label 
                htmlFor="floating_first_name" 
                className="peer-focus:font-medium absolute text-zinc-50 text-opacity-90 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nom
              </label>
          </div>
          <div className="relative z-0 w-full mb-10 group">
              <input 
                type="text" 
                name="floating_last_name" 
                id="floating_last_name" 
                className="block py-2.5 px-0 w-full text-sm text-zinc-50 text-opacity-50 bg-transparent border-0 border-b border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-purple-600 peer" 
                placeholder=" " 
                required
                value={ user.last_name }
                onChange={ lastNameHandler }
              />
              <label 
                htmlFor="floating_last_name" 
                className="peer-focus:font-medium absolute text-sm text-zinc-50 text-opacity-90  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Prénom
              </label>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
                className="w-full sm:w-40 rounded-md"
                gradientDuoTone="purpleToBlue"
                type="submit">
                  Enregistrer
          </Button>
        </div>
        
      </form>
    </div>
  )
}

export default UserAccount;