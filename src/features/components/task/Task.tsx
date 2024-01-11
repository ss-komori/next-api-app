// クライアントコンポーネント
"use client"; // ←※※注意ポイント①※※

// 必要なライブラリとコンポーネントをインポート
import React, { useState } from "react";
import { TaskItem } from "./TaskItem";
import useSWR from "swr";
import { Task } from "@/types";
import TaskForm from "./TaskForm";
import { useStaticTask } from "@/features/hooks/useStatickTask";
import TaskEditModal from "./TaskEditModal";
import TaskConfirmDeleteModal from "./TaskConfirmDeleteModal";
import { Status, noStatusOption, optionStatus } from "@/Enum/status";
import TaskColumn from "../TaskColumn";

export default function Task() {
  // const [task, setTask] = useState("");

  async function fetcher(key: string, init?: RequestInit) {
    return fetch(key, init).then((res) => res.json());
  }

  // const { mutate, data } = useSWR<Task[], Error>("/api/task", fetcher);
  const { tasks, mutate } = useStaticTask();
  // タスク配列に新しいタスクを追加する関数
  const addTask = async (task: Task) => {
    await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    mutate();
  };

  const noStatusTasks = tasks?.filter(
    (task) => task.status === Status.notStatus
  );

  return (
    <>
      <div className={`grid grid-cols-${optionStatus.length} grid-cols-4`}>
        <div className="mx-2 px-4 py-2 rounded-lg bg-gray-200 ">
          <TaskColumn tasks={noStatusTasks} optionStatus={noStatusOption} />
          <TaskForm addTask={addTask} />
        </div>

        {optionStatus.map((status) => {
          const taskListByStatus = tasks?.filter(
            (task) => task.status === status.key
          );
          return (
            <div
              key={status.key}
              className="mx-2 px-4 py-2 rounded-lg bg-gray-200"
            >
              <TaskColumn tasks={taskListByStatus} optionStatus={status} />
            </div>
          );
        })}
      </div>
      <TaskEditModal />
      <TaskConfirmDeleteModal />
    </>
  );
}
