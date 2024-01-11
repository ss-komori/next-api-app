import { Task } from "@/types";
import React, { useState } from "react";
import TaskEditModal from "./TaskEditModal";
import TaskConfirmDeleteModal from "./TaskConfirmDeleteModal";
import { Button } from "@material-tailwind/react";

export default function TaskForm(props: { addTask: (task: Task) => void }) {
  const [task, setTask] = useState<Task>({
    id: -1,
    title: "",
    content: "",
    status: 0,
  });

  const handleClickAddTask = () => {
    props.addTask(task);
    setTask({ id: -1, title: "", content: "", status: 0 });
  };

  return (
    <div className="w-100 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="m-2">
          <label className="text-gray-400">タイトル</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => {
              setTask({ ...task, title: e.target.value });
            }}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="m-2">
          <label className="text-gray-400">内容</label>
          <input
            type="text"
            value={task.content}
            onChange={(e) => {
              setTask({ ...task, content: e.target.value });
            }}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="m-2">
          <Button
            variant="gradient"
            color="indigo"
            onClick={handleClickAddTask}
            placeholder={""}
            className="w-full"
          >
            <span>タスク追加</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
