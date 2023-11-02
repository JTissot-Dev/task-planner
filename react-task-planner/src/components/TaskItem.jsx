const TaskItem = ({task}) => {
  return (
    <div
      className="mx-3 my-2 p-5 bg-slate-800 bg-opacity-50 rounded-md shadow-md shadow-slate-950"
    >
      { task.title }
    </div>
  )
}

export default TaskItem;