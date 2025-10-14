import { createSignal, Show } from "solid-js";

const TaskCard = (props) => {
  const [inputElementRef, setInputElementRef] = createSignal(null);
  const [showTaskNameAsInput, setShowTaskNameAsInput] = createSignal(false);
  // TODO: Delete task status after removing it from Task Card UI
  const [taskStatus, setTaskStatus] = createSignal(null);

  // TODO: Delete task status after removing it from Task Card UI
  setTaskStatus(props.isComplete === "true" ? "Complete" : "Incomplete");

  return (
    <div
      classList={{
        "flex flex-col w-sm p-2 m-2 items-center bg-slate-300 rounded-sm": true,
        // Set the border when task is incomplete
        "border-l-4 border-slate-600": props.isComplete === "false",
      }}
    >
      <div class="w-full text-center">
        <Show
          when={showTaskNameAsInput()}
          fallback={
            <p
              class="p-2 text-center"
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
            class="text-center m-2 w-5/6"
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
          class="bg-blue-200 text-center p-2 m-2"
          onClick={() => {
            const isComplete = props.isComplete === "false" ? "true" : "false";
            props.updateTodoItem(props.id, isComplete, props.name);
          }}
        >
          Change Task Status
        </button>
        <button
          class="bg-blue-200 text-center p-2 m-2"
          onClick={[props.deleteTodoItem, props.id]}
        >
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
