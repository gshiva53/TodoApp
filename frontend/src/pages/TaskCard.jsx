import { createSignal, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import { trash, check, xMark, ellipsisVertical } from "solid-heroicons/outline";
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
              <Icon path={ellipsisVertical} class="size-6 bg-amber-300" />
            </span>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content class="z-50 rounded-sm bg-slate-50 p-2">
              <button>
                <Icon path={trash} class="size-6" />
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
            class="p-2 text-center w-fit max-w-xs overflow-hidden text-ellipsis bg-amber-100"
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
          class="text-center bg-amber-400 field-sizing-content max-w-xs resize-none"
          type="text"
          ref={setInputElementRef}
          value={props.name}
          onBlur={(event) => {
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
