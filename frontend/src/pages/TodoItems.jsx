import { createSignal, For, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import { plus } from "solid-heroicons/outline";
import TaskCard from "./TaskCard";
import CreateTaskCard from "./CreateTaskCard";
import { useApiFunctions } from "./ApiContextProvider";

// . Modularise components
// . Change the Task Name component to use text area.
// . Add Error boundarys to the main page.
// . Add Suspend to the main page.
const TodoItems = () => {
  const [showCreateTaskComponent, setShowCreateTaskComponent] =
    createSignal(false);

  const api = useApiFunctions();

  return (
    <div className="flex flex-col items-center">
      {/* Plus icon inside button */}
      <button
        class="bg-slate-300 p-2 m-4 w-12 h-12 rounded-full"
        onClick={() => setShowCreateTaskComponent(!showCreateTaskComponent())}
      >
        <Icon path={plus} />
      </button>
      <Show when={showCreateTaskComponent()}>
        <CreateTaskCard
          setShowCreateTaskComponent={setShowCreateTaskComponent}
        />
      </Show>
      <For each={api.todos()} fallback={<div>Loading...</div>}>
        {(todo) => (
          <TaskCard
            id={String(todo.id)}
            name={String(todo.name)}
            isComplete={String(todo.isComplete)}
          />
        )}
      </For>
      <Show when={api.postError()}>
        <p>{api.postError()}</p>
      </Show>
    </div>
  );
};

export default TodoItems;
