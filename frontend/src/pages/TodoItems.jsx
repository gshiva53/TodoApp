import { createResource, createSignal, For, Show } from "solid-js";
import TaskCard from "./TaskCard";
import CreateTaskCard from "./CreateTaskCard";

// 3. Editing the task and clicking save should send the put request to
// 	save the task.
// - When the task name is clicked then it changes into input field and
// 	sends an update request on input focus change.
// - User can mark the task complete or incomplete.
// . The task cards are responsive - md/lg task cards for bigger screens
// 	sm cards for smaller screens
// . New task can't be created with an empty name.
// - Do users need to see the Id of the task ?
// . The Create/Delete/Update buttons should show the status of the
// 	request maybe ?
// .
// . User can create a new task which is then posted and saved.
// . user can mark the task complete or incomplete
// . Filter tasks by the complete and incompleted tasks
const TodoItems = () => {
  const [postError, setPostError] = createSignal(null);
  const [showCreateTaskComponent, setShowCreateTaskComponent] =
    createSignal(false);

  const fetchTodoItems = async () => {
    try {
      let response = await fetch("http://192.168.4.24:5000/todoitems");

      if (!response.ok) {
        throw new Error(
          `HTTP: ${response.status} status: ${response.statusText}`,
        );
      }

      const responseText = await response.text();
      const todos = !responseText ? null : JSON.parse(responseText);

      //let todos = await response?.json();

      return todos;
    } catch (error) {
      setPostError(`${response.status}: ${response.statusText}`);
      throw error;
    }
  };

  const updateTodoItem = async (id, isComplete, name) => {
    const boolIsComplete = isComplete === "false" ? false : true;

    const req = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(id),
        name: String(name),
        isComplete: boolIsComplete,
      }),
    };

    try {
      let response = await fetch(
        `http://192.168.4.24:5000/todoitems/${id}`,
        req,
      );

      if (!response.ok) {
        throw new Error(
          `HTTP: ${response.status} status: ${response.statusText}`,
        );
      }

      const responseText = await response.text();
      // if responseText is an empty string then return null
      // else parse the text as json
      response = !responseText ? null : JSON.parse(responseText);

      console.log("updateTodoItem called");

      refetch();

      return response;
    } catch (error) {
      setPostError(`${error.name}: ${error.message}`);
      throw error;
    }
  };

  const postTodoItem = async (name, isComplete) => {
    const boolIsComplete = isComplete === "false" ? false : true;
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: String(name),
        isComplete: boolIsComplete,
      }),
    };

    try {
      let response = await fetch("http://192.168.4.24:5000/todoitems", req);

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status} status: ${response.statusText}`,
        );
      }

      const responseText = await response.text();
      response = !responseText ? null : JSON.parse(responseText);

      console.log("postTodoItem called");

      refetch();

      return response;
    } catch (error) {
      console.log(`Error occured while saving task: ${error}`);
      setPostError(`${error.name}: ${error.message}`);
      throw error;
    }
  };

  const deleteTodoItem = async (id) => {
    const req = {
      method: "DELETE",
    };

    try {
      let response = await fetch(
        `http://192.168.4.24:5000/todoitems/${id}`,
        req,
      );

      if (!response.ok) {
        throw new Error(
          `HTTP: ${response.status} status: ${response.statusText}`,
        );
      }

      const responseText = await response.text();
      response = !responseText ? null : JSON.parse(responseText);

      console.log("deleteTodoItem called");

      refetch();

      return response;
    } catch (error) {
      console.log(`Error occured while saving task: ${error}`);
      setPostError(`${error.name}: ${error.message}`);
      throw error;
    }
  };

  const [todos, { refetch }] = createResource(fetchTodoItems);

  return (
    <div>
      <button
        class="bg-blue-200 p-2 m-4 w-sm"
        onClick={() => setShowCreateTaskComponent(!showCreateTaskComponent())}
      >
        Create Task
      </button>
      <Show when={showCreateTaskComponent()}>
        <CreateTaskCard
          postTodoItem={postTodoItem}
          setShowCreateTaskComponent={setShowCreateTaskComponent}
        />
      </Show>
      <For each={todos()} fallback={<div>Loading...</div>}>
        {(todo) => (
          <TaskCard
            id={String(todo.id)}
            name={String(todo.name)}
            postTodoItem={postTodoItem}
            isComplete={String(todo.isComplete)}
            deleteTodoItem={deleteTodoItem}
            updateTodoItem={updateTodoItem}
          />
        )}
      </For>
      <Show when={postError()}>
        <p>{postError()}</p>
      </Show>
    </div>
  );
};

export default TodoItems;
