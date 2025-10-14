import { createSignal, Show } from "solid-js";

const TaskCard = (props) => {
  const [inputElementRef, setInputElementRef] = createSignal(null);
  const [showTaskNameAsInput, setShowTaskNameAsInput] = createSignal(false);
  const [taskStatus, setTaskStatus] = createSignal(null);

  setTaskStatus(props.isComplete === "true" ? "Complete" : "Incomplete");

  return (
    <div className="flex flex-col w-sm m-2 items-center justify-center">
      <div className="border-2 bg-stone-200 m-2 w-full text-center">
        <Show
          when={showTaskNameAsInput()}
          fallback={
            <p
              className="p-2 text-center"
              onClick={() => {
                setShowTaskNameAsInput(true);
                inputElementRef().focus();
              }}
            >
              {props.name}
            </p>
          }
        >
          <textarea
            className="text-center m-2 w-5/6"
            type="text"
            ref={setInputElementRef}
            value={props.name}
            onChange={(event) => {
              setShowTaskNameAsInput(false);
              props.updateTodoItem(
                props.id,
                props.isComplete,
                event.currentTarget.value,
              );
            }}
          >
            {props.name}
          </textarea>
        </Show>
        <p>{taskStatus()}</p>
        <button
          className="bg-blue-200 text-center p-2 m-2"
          onClick={() => {
            const isComplete = props.isComplete === "false" ? "true" : "false";
            props.updateTodoItem(props.id, isComplete, props.name);
          }}
        >
          Change Task Status
        </button>
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
