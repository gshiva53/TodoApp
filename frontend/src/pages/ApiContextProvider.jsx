import {
  createContext,
  useContext,
  createSignal,
  createResource,
} from "solid-js";

const API_URL = "https://todo.guptashiva.dev/todoitems/";

const ApiContext = createContext();
const [postError, setPostError] = createSignal(null);

const fetchTodoItems = async () => {
  try {
    let response = await fetch(`${API_URL}`);

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
    let response = await fetch(`${API_URL}`, req);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} status: ${response.statusText}`);
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
    let response = await fetch(`${API_URL}${id}`, req);

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

const deleteTodoItem = async (id) => {
  const req = {
    method: "DELETE",
  };

  try {
    let response = await fetch(`${API_URL}${id}`, req);

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

const api = {
  postError: postError,
  todos: todos,
  postTodoItem: postTodoItem,
  updateTodoItem: updateTodoItem,
  deleteTodoItem: deleteTodoItem,
};

const ApiContextProvider = (props) => {
  return (
    <ApiContext.Provider value={api}>{props.children}</ApiContext.Provider>
  );
};

function useApiFunctions() {
  return useContext(ApiContext);
}

export { ApiContext, ApiContextProvider, useApiFunctions };
