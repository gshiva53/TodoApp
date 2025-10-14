const CreateTaskCard = (props) => {
  return (
    <div className="flex flex-col items-center m-2 justify-center">
      <div className="w-sm border-2 bg-stone-200 text-center">
        <input
          className="w-80 text p-2 m-2"
          type="text"
          placeholder="Task Name"
          onChange={(event) => {
            props.setShowCreateTaskComponent(false);
            props.postTodoItem(event.currentTarget.value, "false");
          }}
        ></input>
      </div>
    </div>
  );
};

export default CreateTaskCard;
