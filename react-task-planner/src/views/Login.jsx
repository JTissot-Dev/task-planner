import { Label, TextInput, Button } from "flowbite-react";
import Signup from "./Signup";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <form className="w-screen sm:w-96 flex py-7 px-10 flex-col gap-4 border-2 border-opacity-50 rounded-md border-purple-600 bg-gray-700 bg-opacity-40 mx-3">
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
          <TextInput
            id="password1"
            required
            type="password"
          />
        </div>
        <div className="mb-10">
          <Button 
            type="submit"
            className="w-44 float-right">
            Submit
          </Button>
        </div>
          <Link className="text-purple-600 underline underline-offset-1 text-center" to="/signup">Créer un compte</Link>
      </form>
    </>
  )
}

export default Login;