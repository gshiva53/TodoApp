const TaskCard = (props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-sm border-2 bg-stone-200 m-2 text-center">
        <p>{props.id}</p>
        <p>{props.name}</p>
        <input type="text" onChange={props.postTodoItem}>
          {props.name}
        </input>
        <p>{props.isComplete}</p>
        <button
          className="bg-blue-200 text-center p-2 m-2"
          onClick={[props.deleteTodoItem, props.id]}
        >
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
