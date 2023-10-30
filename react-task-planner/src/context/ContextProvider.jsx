import { createContext, useContext, useState } from "react";

const stateContext = createContext({
  currentUser: null,
  token: null,
  sideBar: false,
  currentProject: '',
  setUser: () => {},
  setToken: () => {},
  setSideBar: () => {},
  setCurrentProject: () => {}
})

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [sideBar, setSideBar] = useState(false);
  const [currentProject, setCurrentProject] = useState('');
  

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
      setUser,
      setToken,
      setSideBar,
      setCurrentProject,
    }}>
      { children }
    </stateContext.Provider>
  )
}

export const useStateContext = () => useContext(stateContext);