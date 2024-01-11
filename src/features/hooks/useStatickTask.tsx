import { useCallback } from "react";
import { useStaticSWR } from "./useStaticSWR";
import { Task } from "@/types";

export const useStaticTask = () => {
  const { data: tasks, mutate } = useStaticSWR<Task[]>("/api/task");

  return {
    tasks,
    mutate,
  };
};
