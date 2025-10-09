const CreateTaskCard = (props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-sm border-2 bg-stone-200 m-2 text-center">
        <input
          className="w-sm"
          type="text"
          className="text"
          placeholder="Task Name"
          onChange={(event) =>
            props.postTodoItem(event.currentTarget.value, "false")
          }
        ></input>
      </div>
    </div>
  );
};

export default CreateTaskCard;
