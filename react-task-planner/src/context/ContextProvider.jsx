import { createContext, useContext, useState } from "react";
import axiosClient from "../axios-client";


const stateContext = createContext({
  currentUser: null,
  token: null,
  sideBar: false,
  currentProject: {},
  loading: false,
  connectionError: '',
  createProjectModal: false,
  setUser: () => {},
  setToken: () => {},
  setSideBar: () => {},
  setCurrentProject: () => {},
  setLoading: () => {},
  setConnectionError: () => {},
  setCreateProjectModal: () => {},
  createProject: () => {}
})

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [sideBar, setSideBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentProject, setCurrentProject] = useState({});
  const [connectionError, setConnectionError] = useState(false);
  const [createProjectModal, setCreateProjectModal] = useState(false);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const createProject = inputCreateProject => {
    setLoading(true);
    const payload = {
      name: inputCreateProject,
      userId: user.id
    }
    axiosClient.post('/project', payload)
      .then(({data}) => {
        setCurrentProject(data.data)
        setLoading(false);
        setCreateProjectModal(false);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  return (
    <stateContext.Provider value={{
      user,
      token,
      sideBar,
      loading,
      currentProject,
      connectionError,
      createProjectModal,
      setUser,
      setToken,
      setSideBar,
      setLoading,
      setCurrentProject,
      setConnectionError,
      setCreateProjectModal,
      createProject
    }}>
      { children }
    </stateContext.Provider>
  )
}

export const useStateContext = () => useContext(stateContext);