import { useApiContext } from "./ApiContextProvider";
import { useTodoContext } from "./TodoItems";
import { Icon } from "solid-heroicons";
import { trash, check, xMark, ellipsisVertical } from "solid-heroicons/outline";
import Popover from "@corvu/popover";

const FloatingMenu = (props) => {
  const api = useApiContext();
  const todo = useTodoContext();

  return (
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
                    todo.isComplete === "false" ? "true" : "false";
                  api.updateTodoItem(todo.id, isComplete, todo.name);
                }}
              >
                <Show
                  when={props.taskIsComplete()}
                  fallback={<Icon path={xMark} class="size-6" />}
                >
                  <Icon path={check} class="size-6" />
                </Show>
              </button>
              <button class="p-0.5" onClick={[api.deleteTodoItem, todo.id]}>
                <Icon path={trash} class="size-6" />
              </button>
            </div>
            <Popover.Arrow class="drop-shadow-lg text-slate-50" />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </div>
  );
};

export default FloatingMenu;
