import { useMemo } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import TaskItem from '../TaskItem';


const TaskDndContext = ({
  listId,
  tasks,
  setTasks
}) => {


  const tasksId = useMemo(() => tasks.map(task => {
    return task.id
  }), [tasks]);

  return (
    <SortableContext 
      items={tasksId}
      strategy={verticalListSortingStrategy}
    >
      {
        tasks &&
        tasks.map(task => {
          return <TaskItem 
                    key={ task.id }
                    task={ task }
                    tasks={ tasks }
                    setTasks={ setTasks } 
                  />
      })}
    </SortableContext>
  );
}

export default TaskDndContext;

  
