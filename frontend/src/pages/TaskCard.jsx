import { createSignal, Show } from "solid-js";
import Popover from "@corvu/popover";

const TaskCard = (props) => {
  const [inputElementRef, setInputElementRef] = createSignal(null);
  const [showTaskNameAsInput, setShowTaskNameAsInput] = createSignal(false);

  return (
    <div
      classList={{
        "flex flex-col w-sm p-2 m-2 items-center relative bg-slate-300 rounded-sm": true,
        // Set the border when task is incomplete
        "border-l-4 border-slate-600": props.isComplete === "false",
      }}
    >
      <div class="absolute right-1 top-1">
        <Popover
          placement="right-start"
          floatingOptions={{
            offset: 13,
          }}
        >
          <Popover.Trigger>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </span>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content class="z-50 rounded-sm bg-slate-50 p-2">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <Popover.Arrow />
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </div>

      <Show
        when={showTaskNameAsInput()}
        fallback={
          <p
            class="p-2 text-center w-fit bg-amber-100"
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
          class="text-center bg-amber-400 p-2 w-fit"
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
  );
};

export default TaskCard;
