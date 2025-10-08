import { createResource, createSignal, For } from "solid-js";
import TaskCard from "./TaskCard";

// 3. Editing the task and clicking save should send the post request to
// 	save the task.
// 4. Filter tasks by the complete and incompleted tasks
const TodoItems = () => {
  const [postError, setPostError] = createSignal(null);

  const fetchTodoItems = async () => {
    let rawData = await fetch("http://192.168.4.24:5000/todoitems");
    let todos = rawData.json();
    return todos;
  };

  const postTodoItem = async () => {
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Get some things for home office setup",
        isComplete: false,
      }),
    };

    try {
      let response = await fetch("http://192.168.4.24:5000/todoitems", req);
      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status} status: ${response.statusText}`,
        );
      }
      response = response.json();
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
      // response = response.json();
      console.log("deleteTodoItem called");
      refetch();
      // return response;
    } catch (error) {
      console.log(`Error occured while saving task: ${error}`);
      setPostError(`${error.name}: ${error.message}`);
      throw error;
    }
  };

  const [todos, { refetch }] = createResource(fetchTodoItems);

  return (
    <div>
      <For each={todos()} fallback={<div>Loading...</div>}>
        {(todo) => (
          <TaskCard
            id={String(todo.id)}
            name={todo.name}
            postTodoItem={postTodoItem}
            isComplete={String(todo.isComplete)}
            deleteTodoItem={deleteTodoItem}
          />
        )}
      </For>
      <button class="bg-blue-200 p-2 m-4" onClick={postTodoItem}>
        Save Task
      </button>
      <Show when={postError()}>
        <p>Saving Task status: {postError()}</p>
      </Show>
    </div>
  );
};

export default TodoItems;
