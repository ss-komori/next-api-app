import {
  OptionStatusType,
  Status,
  getStatusName,
  optionStatus,
} from "@/Enum/status";
import { useStaticTask } from "@/features/hooks/useStatickTask";
import { closeModal } from "@/features/reducers/modalSlice";
import { useSelector } from "@/store/store";
import { Task } from "@/types";
import {
  Button,
  Input,
  Select,
  Textarea,
  Option,
} from "@material-tailwind/react";
import Dialog, {
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react/components/Dialog";
import {
  CheckCircle,
  NotStarted,
  RunCircle,
  PanoramaFishEye,
} from "@mui/icons-material";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function TaskEditModal(props: {}) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.editModal);
  const editTask = useSelector((state) => state.modals.task);
  const [task, setTask] = useState<Task>({
    id: -1,
    title: "",
    content: "",
    status: 0,
  });

  const { mutate } = useStaticTask();

  useEffect(() => {
    setTask(editTask);
  }, [editTask]);

  const handleClose = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLDivElement>,
    isUpdate?: boolean
  ) => {
    if (isUpdate) {
      handleClickEdit();
    }
    dispatch(closeModal());
  };

  // 更新
  const handleClickEdit = async () => {
    await fetch("/api/task", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    mutate();
  };

  const getIconDom = (key: number | undefined) => {
    switch (key) {
      case Status.notStarted:
        return <NotStarted className="w-6 h-6 text-white fill-current" />;
      case Status.inProgress:
        return <RunCircle className="w-6 h-6 text-white fill-current" />;
      case Status.done:
        return <CheckCircle className="w-6 h-6 text-white fill-current" />;
      default:
        return <PanoramaFishEye className="w-6 h-6 text-white fill-current" />;
    }
  };
  const [optionStatusState, setOptionStatusState] =
    useState<OptionStatusType>();

  const handleStatusChange = (status: string | undefined) => {
    setTask({ ...task, status: Number(status) });
  };

  return (
    <>
      <Dialog
        className="p-5"
        open={isOpen}
        size="xs"
        handler={handleClose}
        placeholder={undefined}
      >
        <DialogHeader className="text-gray-600" placeholder={undefined}>
          編集
        </DialogHeader>
        <DialogBody placeholder={undefined}>
          <div className="flex flex-col gap-8">
            <Input
              crossOrigin=""
              value={task.title}
              onChange={(e) => {
                setTask({ ...task, title: e.target.value });
              }}
              variant="static"
              label="タイトル"
              placeholder="Title"
            />
            <div className="w-1/2">
              <Select
                size="lg"
                label="状態"
                defaultValue={task.status}
                value={String(task.status)}
                onChange={(status) => handleStatusChange(status)}
                selected={(element) =>
                  element &&
                  React.cloneElement(element, {
                    disabled: true,
                    className:
                      "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                  })
                }
                placeholder={undefined}
              >
                {optionStatus.map((status) => {
                  return (
                    <Option key={status.key} value={String(status.key)}>
                      <div className="flex items-center">
                        <span
                          className={`p-1 me-2 border rounded bg-${status.color}-500`}
                        >
                          {getIconDom(status.key)}
                        </span>
                        <span>{status.status}</span>
                      </div>
                    </Option>
                  );
                })}
              </Select>
            </div>
            <Textarea
              value={task.content}
              onChange={(e) => {
                setTask({ ...task, content: e.target.value });
              }}
              variant="static"
              label="内容"
              placeholder="内容"
            />
          </div>
        </DialogBody>
        <DialogFooter placeholder={undefined}>
          <Button
            variant="text"
            color="gray"
            onClick={handleClose}
            className="mr-1"
            placeholder={undefined}
          >
            <span>キャンセル</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={(e) => handleClose(e, true)}
            placeholder={"保存"}
          >
            <span>保存</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
