import { Label, TextInput, Button } from "flowbite-react";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ShowPasswordIcon } from "../components/icons";

const Login = () => {

  const [passwordShow, setPasswordShow] = useState(false);

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  }

  return (
    <>
      <form className="z-20 w-screen sm:w-96 flex py-7 px-10 flex-col gap-4 border-4 border-opacity-50 rounded-lg border-b-violet-600 border-r-violet-600 border-l-cyan-400 border-t-cyan-400 bg-gray-700 bg-opacity-40 mx-3 shadow-md">
        <div className="mb-10">
          <div className="mb-2 block">
            <Label
              className="text-zinc-50"
              htmlFor="email1"
              value="Your email"
            />
          </div>
          <TextInput
            id="email1"
            placeholder="name@flowbite.com"
            required
            type="email"
          />
        </div>
        <div className="mb-10">
          <div className="mb-2 block">
            <Label
              className="text-zinc-50"
              htmlFor="password1"
              value="Your password"
            />
          </div>
          <div className="relative">
            <TextInput
              id="password1"
              required
              type={ passwordShow ? "text" : "password" }
            />
              <ShowPasswordIcon 
                onMouseOver={ togglePassword }
                onMouseLeave={ togglePassword }
              />
          </div>
        </div>
        <div className="mb-10">
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            outline
            className="w-28 float-right">
            Connexion
          </Button>
        </div>
          <Link className="text-zinc-50 underline underline-offset-1 text-center" to="/signup">Créer un compte</Link>
      </form>
    </>
  )
}

export default Login;