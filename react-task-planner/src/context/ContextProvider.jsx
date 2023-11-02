import { createContext, useContext, useState } from "react";

const stateContext = createContext({
  currentUser: null,
  token: null,
  sideBar: false,
  currentProject: '',
  connectionError: '',
  setUser: () => {},
  setToken: () => {},
  setSideBar: () => {},
  setCurrentProject: () => {},
  setConnectionError: () => {}
})

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [sideBar, setSideBar] = useState(false);
  const [currentProject, setCurrentProject] = useState('');
  const [connectionError, setConnectionError] = useState(false);
  

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  return (
    <stateContext.Provider value={{
      user,
      token,
      sideBar,
      currentProject,
      connectionError,
      setUser,
      setToken,
      setSideBar,
      setCurrentProject,
      setConnectionError
    }}>
      { children }
    </stateContext.Provider>
  )
}

export const useStateContext = () => useContext(stateContext);