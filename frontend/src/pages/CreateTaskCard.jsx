import { useApiContext } from "./ApiContextProvider";

const CreateTaskCard = (props) => {
  const api = useApiContext();

  return (
    <div className="text-center m-2 p-2 justify-center w-sm rounded-sm bg-slate-300">
      <textarea
        class="text-center field-sizing-content max-w-xs resize-none outline-none whitespace-pre-wrap"
        type="text"
        placeholder="Task Name"
        onChange={(event) => {
          props.setShowCreateTaskComponent(false);
          api.postTodoItem(event.currentTarget.value, "false");
        }}
      ></textarea>
    </div>
  );
};

export default CreateTaskCard;
