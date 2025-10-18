import { createSignal, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import { trash, check, xMark, ellipsisVertical } from "solid-heroicons/outline";
import Popover from "@corvu/popover";
import { useApiFunctions } from "./ApiContextProvider";

const TaskCard = (props) => {
  const [inputElementRef, setInputElementRef] = createSignal(null);
  const [showTaskNameAsInput, setShowTaskNameAsInput] = createSignal(false);
  const [taskIsComplete, setTaskIsComplete] = createSignal(null);

  setTaskIsComplete(() => (props.isComplete === "true" ? true : false));

  const api = useApiFunctions();

  return (
    <div
      classList={{
        "flex flex-col w-sm p-2 m-2 items-center relative bg-slate-300 rounded-sm": true,
        // Set the border when task is incomplete
        "border-l-4 border-slate-600": taskIsComplete(),
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
              <Icon path={ellipsisVertical} class="size-6" />
            </span>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content class="drop-shadow-lg rounded-sm bg-slate-50 p-2">
              <div class="flex flex-col">
                <button
                  class="p-0.5"
                  onClick={() => {
                    const isComplete =
                      props.isComplete === "false" ? "true" : "false";
                    api.updateTodoItem(props.id, isComplete, props.name);
                  }}
                >
                  <Show
                    when={taskIsComplete()}
                    fallback={<Icon path={xMark} class="size-6" />}
                  >
                    <Icon path={check} class="size-6" />
                  </Show>
                </button>
                <button class="p-0.5" onClick={[api.deleteTodoItem, props.id]}>
                  <Icon path={trash} class="size-6" />
                </button>
              </div>
              <Popover.Arrow class="drop-shadow-lg text-slate-50" />
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </div>

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
            {props.name}
          </p>
        }
      >
        <textarea
          class="text-center field-sizing-content max-w-xs resize-none whitespace-pre-wrap"
          type="text"
          ref={setInputElementRef}
          value={props.name}
          onBlur={(event) => {
            setShowTaskNameAsInput(false);
            api.updateTodoItem(
              props.id,
              props.isComplete,
              event.currentTarget.value,
            );
          }}
        >
          {props.name}
        </textarea>
      </Show>
    </div>
  );
};

export default TaskCard;
