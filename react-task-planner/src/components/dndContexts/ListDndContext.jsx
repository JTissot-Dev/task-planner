import { useState, useMemo, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  DndContext,
  DragOverlay, 
  closestCorners,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';

import List from '../List';
import axiosClient from '../../axios-client';
import ErrorAlert from '../alerts/ErrorAlert';
import TaskItem from '../TaskItem';


const listDndContext = ({
  projectId,
  lists,
  setLists,
  tasks,
  setTasks,
  setErrorNotification
}) => {
  const listsId = useMemo(() =>  lists.map(list => list.id), [lists]);
  const [activeList, setActiveList] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [swapLists, setSwapLists] = useState(false);
  const [swapTasks, setSwapTasks] = useState(false);

  const updateListOrder = () => {
    const orderedLists = lists.map(list => {
      return {
        ...list,
        position: lists.indexOf(list)
      }
    });

    const payload = {
      lists: orderedLists
    }

    axiosClient.put(`/project/${projectId}`, payload)
    .then(() => {
      setSwapLists(false);
    })
    .catch(() => {
      const message = 'Erreur lors de la mise à jour';
      setErrorNotification(<ErrorAlert message={ message } dismissAlert={ () => setErrorNotification('') } />);
    })
  }

  const updateTasksOrder = () => {
    setSwapTasks(false);
    const orderedTasks = tasks.map(task => {
      return {
        ...task,
        position: tasks.indexOf(task)
      }
    });

    const payload = {
      tasks: orderedTasks
    }

    axiosClient.put(`/project/${projectId}`, payload)
    .catch(() => {
      setSwapTasks(false);
      const message = 'Erreur lors de la mise à jour';
      setErrorNotification(<ErrorAlert message={ message } dismissAlert={ () => setErrorNotification('') } />);
    })
  }

  if (swapLists) updateListOrder();
  if (swapTasks) updateTasksOrder(); 

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <SortableContext 
        items={listsId}
        strategy={horizontalListSortingStrategy}
      >
        {
          lists &&
          lists.map(list => {
            return <List 
                      key={ list.id }
                      id={ list.id } 
                      list={ list }
                      lists={ lists }
                      tasks={ tasks.filter(
                        task => task.list_id === list.id
                      ) }
                      setTasks={ setTasks }
                      setLists={ setLists } 
                      setErrorNotification={ setErrorNotification } 
                    />
        })}
      </SortableContext>
      {
        createPortal(
          <DragOverlay>
            {activeList && (
              <List 
                list={activeList}
                tasks={ tasks.filter(task => {
                  return task.list_id === activeList.id
                }) }
                id={activeList.id}
                overlayStyle="opacity-50"
              />
            )}
            {activeTask && <TaskItem task={activeTask} />}
          </DragOverlay>,
          document.body
        )
      }
    </DndContext>
  );

  function handleDragStart(event) {
    if (event.active.data.current.type === 'list') {
      setActiveList(event.active.data.current.list);
      return;
    }  
    
    if (event.active.data.current.type === 'task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  
  function handleDragEnd(event) {
    setActiveList(null);
    setActiveTask(null);

    const {active, over} = event;

    if (event.active.data.current.type === 'list') {
      if (active.id !== over.id) {
        setSwapLists(true);
        setLists((lists) => {
          const oldIndex = lists.findIndex(list => list.id === active.id);
          const newIndex = lists.findIndex(list => list.id === over.id);
          return arrayMove(lists, oldIndex, newIndex);
        });
      }
      return; 
    }

    if (event.active.data.current.type === 'task') {
      setSwapTasks(true);
      return;
    }
  }

  function handleDragOver(event) {
    const {active, over} = event;

    if (!over) return;
    if (active.id === over.id) return;
    const isActiveTask = active.data.current.type === 'task';
    const isOverTask = over.data.current.type === 'task';
  
    if (!isActiveTask) return;
  
    if (isActiveTask && isOverTask) {
      setTasks((prevTasks) => {
        let oldIndex = prevTasks.findIndex(task => task.id === active.id);
        let newIndex = prevTasks.findIndex(task => task.id === over.id);

        if (prevTasks[oldIndex].list_id !== prevTasks[newIndex].list_id) {
          prevTasks[oldIndex].list_id = prevTasks[newIndex].list_id;
          if (newIndex > oldIndex) {
            newIndex -= 1;
          } 
        }
        return arrayMove(prevTasks, oldIndex, newIndex);
      });
    }
    
    const isOverList = over.data.current.type === 'list';
    if (isActiveTask && isOverList) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex(task => task.id === active.id);
        tasks[oldIndex].list_id = over.id;
        return arrayMove(tasks, oldIndex, oldIndex);
      });
    }
  }
}



export default listDndContext;
  
