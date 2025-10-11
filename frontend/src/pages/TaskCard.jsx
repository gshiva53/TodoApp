import { createSignal, Show } from "solid-js";

const TaskCard = (props) => {
  const [showTaskNameAsInput, setShowTaskNameAsInput] = createSignal(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-sm border-2 bg-stone-200 m-2 text-center">
        <p>{props.id}</p>
        <Show
          when={showTaskNameAsInput()}
          fallback={
            <p onClick={() => setShowTaskNameAsInput(true)}>{props.name}</p>
          }
        >
          <input
            className="w-xs m-2"
            type="text"
            placeholder={props.name}
            onChange={(e) => {
              props.updateTodoItem(props.id, props.isComplete, e);
              setShowTaskNameAsInput(false);
            }}
          >
            {props.name}
          </input>
        </Show>
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
