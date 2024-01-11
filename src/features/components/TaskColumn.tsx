import { Task } from "@/types";
import { TaskItem } from "./task/TaskItem";
import { OptionStatusType, optionStatus } from "@/Enum/status";

export default function TaskColumn(props: {
  tasks: Task[] | undefined;
  optionStatus: OptionStatusType;
}) {
  return (
    <>
      <span
        className={`inline-flex items-center py-1.5 px-3 mb-1 rounded-full text-xs font-medium bg-${props.optionStatus.color}-500 text-white`}
      >
        {props.optionStatus.status}
      </span>
      <div className="border bg-gray-100 rounded-lg">
        {props.tasks?.map((task: Task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
