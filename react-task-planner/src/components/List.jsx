import { useState, useEffect, useRef } from "react";
import axiosClient from "../axios-client";
import { AddProjectIcon } from "./icons";
import { ExpandListIcon } from "./icons";
import TaskItem from "./TaskItem";
import ErrorAlert from "./alerts/ErrorAlert";
import { DeleteIcon } from "./icons";
import useOutsideClick from "../useOutsideClick";
import DeleteListModal from "./modals/DeleteListModal";
import AddTaskItem from "./AddTaskItem";


const List = ({list, setErrorNotification, setLists}) => {
  
  const [listItem, setListItem] = useState({
    id: null,
    title: '',
    prevTitle: '',
    position: null,
    projectId: null
  });

  const [tasks, setTasks] = useState([]);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [deleteListModal, setDeleteListModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addTask, setAddTask] = useState(false);

  const titleRef = useRef();
  const clickOutside = useOutsideClick(() => setDropDownMenu(prev => !prev));

  useEffect(() => {
    setListItem({
      id: list.id,
      title: list.title,
      prevTitle: list.title,
      position: list.position,
      projectId: list.projectId
    });

    setTasks(list.tasks);
  }, [list.projectId])

  useEffect(() => {
    titleRef.current.height = 'auto';
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  }, [titleRef.current, listItem.title])

  const handleTitle = e => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setListItem({
      ...listItem,
      title: e.target.value
    });
  }

  const updateList = e => {
    if (listItem.title) {
      const payload = {
        title: listItem.title
      }
      axiosClient.put(`/list/${list.id}`, payload)
      .then(({data}) => {
        setListItem({
          ...listItem,
          title: data.data.title,
          prevTitle: data.data.title
        });
      })
      .catch(() => {
        const message = 'Erreur lors de la mise à jour de la liste';
        setErrorNotification(<ErrorAlert message={ message } dismissAlert={ () => setErrorNotification('') } />);
      })
    } else {
      setListItem({
        ...listItem,
        title: listItem.prevTitle
      })
    }
  }

  const deleteList = () => {
    setLoading(true);
    axiosClient.delete(`/list/${list.id}`)
    .then(() => {
      setLists(prev => prev.filter(prevList => prevList.id != list.id))
      setLists(prev => prev.map(prevList => {
          return {
            ...prevList,
            position: prevList.position > list.position ? prevList.position -1 : prevList.position
          }
      }));
      setLoading(false);
      setDeleteListModal(false);
    })
    .catch(() => {
      setLoading(false);
      setDeleteListModal(false);
      const message = 'Erreur lors de la suppression de la liste';
      setErrorNotification(<ErrorAlert message={ message } dismissAlert={ () => setErrorNotification('') } />);
    })
  }


  const dropDownListMenu = dropDownMenu &&
    (
    <ul 
      className="bg-slate-950 bg-opacity-100 w-full border-y border-zinc-50 border-opacity-50"
      ref = { clickOutside }
    >
      <li className="w-full">
        <button 
          className="flex w-full p-3 items-center justify-center hover:bg-slate-800 hover:bg-opacity-50 hover:ease-in-out transition duration-200"
          onClick={() => setDeleteListModal(true) }
        >
          <DeleteIcon />
          <p className="ms-2 text-sm">Supprimer la liste</p>
        </button>
      </li>
    </ul>
    )

  return (
    <div className="h-full">
      <div className="relative max-h-full flex flex-col justify-between grow-0 shrink-0 w-80 mb-10 me-8 rounded-xl border border-zinc-50 border-opacity-50">
        <div className="absolute w-full top-14 z-50">
          { dropDownListMenu }
        </div>
        <div className="flex w-full pt-3 pb-1 px-3 justify-between items-start rounded-t-md">
          <h2 className="w-full me-5">
            <textarea
              rows="1"
              ref={ titleRef }
              className="max-h-32 w-full resize-none overflow-y-hidden flex flex-col flex-grow ms-2 p-1 bg-transparent hover:cursor-pointer hover:bg-slate-800 hover:bg-opacity-50 hover:ease-in-out transition duration-200 rounded-md border-0 focus:bg-slate-800 focus:bg-opacity-50 focus:ring-purple-600 focus:border-purple-600"
              value={ listItem.title }
              onChange={ handleTitle }
              onBlur={ updateList }
            >
              { listItem.title }
            </textarea>
          </h2>
          <button
            className="p-2 hover:bg-slate-800 hover:bg-opacity-50 hover:ease-in-out transition duration-200 rounded-full"
            onClick={ () => setDropDownMenu(true) }
          >
            <ExpandListIcon />
          </button>
        </div>
        <div 
          className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-track-zinc-400 scrollbar-thumb-slate-800 my-2 mx-1 px-3 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
        >
          {
            tasks &&
            tasks.map(task => {
              return <TaskItem key={ task.id } task= {task} setErrorNotification={ setErrorNotification }/>
            })
          }
          <AddTaskItem 
            addTask={ addTask }
            setAddTask={ setAddTask }
            listId={ listItem.id }
            tasks={ tasks }
            setTasks={ setTasks }
          />
        </div>
      </div>

      { deleteListModal && <DeleteListModal loading={ loading } setDeleteListModal={ setDeleteListModal } deleteList={ deleteList }/> }
    </div>

  )
}

export default List;