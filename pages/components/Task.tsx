import { memo, useState } from "react";
import { FaPenAlt, FaTrash } from "react-icons/fa";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import { LuUserCheck,LuUserMinus } from "react-icons/lu";


function Task(props: any) {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState(props.status);

  
  const editTask = async (e: any) => {

    await fetch("/api/editTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        title,
        description,
      }),
    });
  };

  const removeTask = async () => {
    await fetch("/api/deleteTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.id }),
    });
    window.location.reload();
  };

  const completeTask = async () => {

    const statusData = !taskStatus;
    await fetch("/api/completeTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.id, statusData }),
    });
    window.location.reload();   
  };

  // const colors = [
  //   'bg-[#ff7eb9]',
  //   'bg-[#7afcff]',
  //   'bg-[#feff9c]',
  //   'bg-[#fff740]'
  // ];

  // const randomIndex = Math.floor(Math.random() * colors.length);

  // const randomColor = colors[randomIndex];

  return (
    <>
      <div className={props.status === true ? `flex flex-col px-5 py-7 min-h-[200px] bg-[#feff9c] line-through shadow-lg hover:-translate-y-2 hover:transform hover:scale-105 transition-all duration-200`:`flex flex-col px-5 py-7 min-h-[200px] bg-[#feff9c] shadow-lg hover:-translate-y-2 hover:transform hover:scale-105 transition-all duration-200`}>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">{props.title}</h1>
          <div className="flex items-center gap-x-2">
            <button onClick={completeTask} className="text-xl">
            {
              props.status === false ? <IoMdCheckmark /> : <IoMdClose />
            }
            </button>
            <button onClick={() => setShowEdit(true)} className="">
              <FaPenAlt />
            </button>
            <button onClick={removeTask} className="">
              <FaTrash />
            </button>
          </div>
        </div>
        <span className="text-xs text-red-500 ">{props.time}</span>
        <p className="text-lg mt-3 break-words">{props.description}</p>
      </div>
      {showEdit && (
        <div className="flex flex-col px-7 border border-black py-5 mb-10">
          <IoMdClose onClick={() => setShowEdit(false)} className="ml-auto" />
          <form
            onSubmit={editTask}
            className="flex w-full flex-col gap-y-3 mb-3"
          >
            <div className="flex flex-col gap-y-1">
              <label>Title :</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                className="px-4 py-2 text-black focus:outline-none border border-black"
                placeholder="Take Remi to Dog Park"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label>Description :</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                className="px-4 py-2 h-32 focus:outline-none border border-black"
                placeholder="Lorem ipsum dolor set ..."
              ></textarea>
            </div>
            <input
              type="submit"
              value="Update"
              className="bg-green-500 text-white px-4 py-2"
            />
          </form>
        </div>
      )}
    </>
  );
}

export default memo(Task);
