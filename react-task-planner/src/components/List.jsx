import { useState, useEffect, useRef } from "react";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import axiosClient from "../axios-client";
import { ExpandListIcon, MoveListIcon } from "./icons";
import ErrorAlert from "./alerts/ErrorAlert";
import { DeleteIcon } from "./icons";
import useOutsideClick from "../useOutsideClick";
import DeleteListModal from "./modals/DeleteListModal";
import AddTaskItem from "./AddTaskItem";
import TaskDndContext from "./dndContexts/taskDndContext";


const List = ({
  list, 
  setErrorNotification, 
  lists, 
  setLists,
  tasks,
  setTasks,
  overlayStyle
}) => {

  const [listItem, setListItem] = useState({
    id: list.id,
    title: list.title,
    prevTitle: list.title,
    position: list.position,
    projectId: list.projectId,
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: listItem.id,
    data: {
      type: 'list',
      list: listItem
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [deleteListModal, setDeleteListModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addTask, setAddTask] = useState(false);

  const titleRef = useRef();
  const clickOutside = useOutsideClick(() => setDropDownMenu(prev => !prev));

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

  const updateList = () => {
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
      setTasks(prev => prev.filter(prevTask => prevTask.list_id !== list.id));
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
      className="bg-slate-950 bg-opacity-50 backdrop-blur w-full border-y border-zinc-50 border-opacity-50"
      ref = { clickOutside }
    >
      <li className="w-full">
        <button 
          className="flex w-full p-3 items-center justify-center hover:bg-slate-800 hover:bg-opacity-50 hover:ease-in-out transition duration-200"
          onClick={() => setDeleteListModal(true) }
        >
          <DeleteIcon style="w-4 h-4"/>
          <p className="ms-2 text-sm">Supprimer la liste</p>
        </button>
      </li>
    </ul>
    )


  return (
    <div 
      className={`h-full relative ${overlayStyle ? overlayStyle : ''}`}
      ref={setNodeRef} 
      style={style} 
    >
      <button
        className={`${isDragging ? 'hidden' : 'absolute z-30 px-2 py-1 -top-3.5 start-36 bg-slate-950 hover:bg-slate-900 hover:ease-in-out transition duration-200 rounded-full'} `}
        {...attributes} {...listeners}
        >
          <MoveListIcon />
      </button>
      <div 
        className={`${isDragging ? 'border-2 border-purple-600' : 'border border-zinc-50'} relative max-h-full flex flex-col justify-between grow-0 shrink-0 w-80 me-8 rounded-xl border-opacity-50`}
      >      
        <div className="absolute w-full top-14 z-40">
          { dropDownListMenu }
        </div>
        <div 
          className={`${isDragging && 'opacity-0'} flex w-full pt-5 pb-1 px-3 justify-between items-start rounded-t-md`}
        >
          <h2 className="w-full me-5">
            <textarea
              rows="1"
              ref={ titleRef }
              className="max-h-32 text-zinc-50 text-opacity-90 w-full resize-none overflow-y-hidden flex flex-col flex-grow ms-2 py-1 px-0 focus:px-2 bg-transparent hover:cursor-pointer rounded-md border-0 focus:bg-slate-800 focus:bg-opacity-50 focus:ring-purple-600 focus:border-purple-600"
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
            <ExpandListIcon style="text-zinc-50 text-opacity-90"/>
          </button>
        </div>
        <div 
          className={`${isDragging && 'opacity-0'} flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-track-zinc-400 scrollbar-thumb-slate-800 my-2 mx-1 px-3 scrollbar-thumb-rounded-full scrollbar-track-rounded-full`} 
        >
          <TaskDndContext 
            listId={ listItem.id }
            tasks={ tasks }
            setTasks={ setTasks }
          />
          <AddTaskItem 
            addTask={ addTask }
            setAddTask={ setAddTask }
            listId={ listItem.id }
            tasks={ tasks }
            setTasks={ setTasks }
            setErrorNotification={ setErrorNotification }
          />
        </div>
      </div> 
      { deleteListModal && <DeleteListModal loading={ loading } setDeleteListModal={ setDeleteListModal } deleteList={ deleteList }/> }
    </div>

  );
}

export default List;