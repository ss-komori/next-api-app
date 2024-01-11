"use client";
import Task from "@/features/components/task/Task";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Page() {
  return (
    <Provider store={store}>
      <div className="w-100 flex justify-center">
        <div className="my-5">
          <h1 className="text-xl font-bold text-green-400">Todo App</h1>
          <Task />
        </div>
      </div>
    </Provider>
  );
}
