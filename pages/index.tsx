import { Inter } from "next/font/google";
import { useState } from "react";
import Task from "./components/Task";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks", {
    method: "GET",
    headers: {
      contentType: "application/json",
    },
  });
  const data = await res.json();

  return {
    props: { tasks: data },
  };
};

export default function Home(props: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = async (e: any) => {
    // e.preventDefault();

    await fetch("/api/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    window.location.reload();   
  };

  // console.log(props.tasks);
  return (
    <main
    style={{backgroundImage: `url('/marjan-blan-794QUz5-cso-unsplash.jpg')`}}
      className={`flex bg-fixed bg-cover min-h-screen pt-10 flex-col items-center px-10 ${inter.className}`}
    >
      <div className="w-full md:grid md:grid-cols-2 md:w-full md:items-center">
        <div>
          <h1 className="text-2xl font-bold mb-5 text-center md:text-left">
            To-Do 📝
          </h1>
          <p className="hidden text-justify md:flex mr-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            est accusamus molestiae laudantium, error sed, minima distinctio
            praesentium dolor dolores suscipit, adipisci numquam nemo incidunt
            quia hic? Delectus voluptatibus rerum obcaecati, natus corporis nam
            fugit rem harum impedit adipisci soluta, animi sequi, aut quisquam
            ratione earum tempora nisi. Consectetur optio velit maxime incidunt
            magnam!
          </p>
        </div>
        <form
          onSubmit={addTask}
          className="flex w-full flex-col gap-y-3 md:w-4/6 md:mx-auto"
        >
          <div className="flex flex-col gap-y-1">
            <label>Title :</label>
            <input
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              className="px-4 py-2 focus:outline-none border border-black bg-transparent placeholder-slate-700"
              placeholder="Take Remi 🐶 for a walk"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label>Description :</label>
            <textarea
              required
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              className="px-4 py-2 h-32 focus:outline-none border border-black bg-transparent placeholder-slate-700"
              placeholder="Lorem ipsum dolor set ..."
            ></textarea>
          </div>
          <input
            type="submit"
            value="+ Add Task"
            className="hover:shadow-md hover:cursor-pointer border border-black bg-black text-white px-4 py-2"
          />
        </form>
      </div>
      <span className="mx-auto text-lg font-bold my-10">[ Task List ]</span>
      <div className="flex flex-col gap-y-5 w-full pb-20 md:grid md:grid-cols-4 md:gap-7">
        {props.tasks.length > 0 ? (
          props.tasks.map((task: any, index: any) => (
            <Task
              id={task._id}
              key={index}
              title={task.title}
              description={task.description}
              time={task.time}
              status={task.status}
            />
          ))
        ) : (
          <span className="mx-auto text-lg">👻Tasklist is Empty ! </span>
        )}
      </div>
    </main>
  );
}
