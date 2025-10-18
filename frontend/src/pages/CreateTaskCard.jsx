import { useApiContext } from "./ApiContextProvider";

const CreateTaskCard = (props) => {
  const api = useApiContext();
  return (
    <div className="flex flex-col items-center m-2 justify-center">
      <div className="w-sm bg-slate-300 text-center">
        <input
          className="w-80 text p-2"
          type="text"
          placeholder="Task Name"
          onChange={(event) => {
            props.setShowCreateTaskComponent(false);
            api.postTodoItem(event.currentTarget.value, "false");
          }}
        ></input>
      </div>
    </div>
  );
};

export default CreateTaskCard;
