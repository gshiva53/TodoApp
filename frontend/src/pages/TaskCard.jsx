import { createSignal, onCleanup, Show } from "solid-js";
import { useApiContext } from "./ApiContextProvider";
import { useTodoContext } from "./TodoItems";
import FloatingMenu from "./FloatingMenu";

const TaskCard = () => {
  const [inputElementRef, setInputElementRef] = createSignal(null);
  const [showTaskNameAsInput, setShowTaskNameAsInput] = createSignal(false);
  const [taskIsComplete, setTaskIsComplete] = createSignal(null);

  const api = useApiContext();
  const todo = useTodoContext();

  setTaskIsComplete(() => (todo.isComplete === "true" ? true : false));

  function handleEventRemoval() {
    console.log("Input event removed");
  }

  onCleanup(() => {
    // inputElementRef().removeEventListener("input", handleEventRemoval);
    console.log(inputElementRef());
    console.log("Cleanup called on Task Card");
  });

  return (
    <div
      classList={{
        "flex flex-col w-sm p-2 m-2 items-center relative bg-slate-300 rounded-sm": true,
        // Set the border when task is incomplete
        "border-l-4 border-slate-600": taskIsComplete(),
      }}
    >
      <FloatingMenu taskIsComplete={taskIsComplete} />

      <Show
        when={showTaskNameAsInput()}
        fallback={
          <p
            class="p-2 text-center w-fit max-w-xs overflow-hidden text-ellipsis whitespace-pre-wrap"
            onClick={() => {
              setShowTaskNameAsInput(true);
              inputElementRef().focus();
            }}
          >
            {todo.name}
          </p>
        }
      >
        <textarea
          class="text-center field-sizing-content max-w-xs resize-none outline-none whitespace-pre-wrap"
          type="text"
          ref={setInputElementRef}
          value={todo.name}
          onBlur={(event) => {
            setShowTaskNameAsInput(false);
            api.updateTodoItem(
              todo.id,
              todo.isComplete,
              event.currentTarget.value,
            );
          }}
        >
          {todo.name}
        </textarea>
      </Show>
    </div>
  );
};

export default TaskCard;
