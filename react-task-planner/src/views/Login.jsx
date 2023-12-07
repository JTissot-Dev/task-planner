import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";
import { ShowPasswordIcon } from "../components/icons";
import MotionGuestForms from "../components/MotionGuestForms";
import { useStateContext } from "../context/ContextProvider";
import DefaultSpinner from "../components/Spinners/DefaultSpinner";

const Login = () => {

  const {setUser, setToken} = useStateContext();
  const [passwordShow, setPasswordShow] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  }

  const loginSubmit = e => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axiosClient.post("/login", payload)
      .then(({data}) => {
        setUser(data);
        setToken(data.token);
        setLoading(false);
      })
      .catch(({response}) => {
        setLoading(false);
        if (response && response.status === 422) {
          if (response.data.errors) {
            setLoginError(response.data.errors);
          } else {
            setLoginError(response.data.message);
          }
        }
      })
  }


  return (
    <>
      <MotionGuestForms>
        <form className="relative py-5 px-8 flex flex-col gap-4 border-4 border-opacity-50 rounded-2xl border-b-violet-600 border-r-violet-600 border-l-cyan-400 border-t-cyan-400 bg-gray-700 bg-opacity-40"
              onSubmit={ loginSubmit }
        >
          <div className="z-50 absolute top-5 start-1/2">
            { loading && <DefaultSpinner /> }
          </div>
          <div>
            <img src="/logo/brand-logo.png"></img>
          </div>
          <div className="mb-10">
            <div className="mb-2 mt-5 block">
              <Label
                className="text-zinc-50"
                htmlFor="email1"
                value="Adresse e-mail"
              />
            </div>
            <TextInput
              id="email1"
              placeholder="nom.prenom@taskplanner.com"
              required
              type="email"
              ref={ emailRef }
            />
          </div>
          <div className="mb-5">
            <div className="mb-2 block">
              <Label
                className="text-zinc-50"
                htmlFor="password1"
                value="Mot de passe"
              />
            </div>
            <div className="relative">
              <TextInput
                id="password1"
                required
                type={ passwordShow ? "text" : "password" }
                ref={ passwordRef }
              />
              <ShowPasswordIcon 
                onMouseEnter={ togglePassword }
                onMouseLeave={ togglePassword }
              />
            </div>
            <div className="text-xs h-1 text-red-700 mt-2">
            { loginError }
            </div>
          </div>
          <div className="mb-10">
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              outline
              className="w-32 float-right">
              Connexion
            </Button>
          </div>
          <Link className="text-zinc-50 underline underline-offset-2 text-center" to="/signup">Créer un compte</Link>
        </form>
      </MotionGuestForms>
    </>
  )
}

export default Login;