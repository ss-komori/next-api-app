import { useStaticTask } from "@/features/hooks/useStatickTask";
import { closeModal } from "@/features/reducers/modalSlice";
import { useSelector } from "@/store/store";
import { Button } from "@material-tailwind/react";
import Dialog, {
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react/components/Dialog";
import React from "react";
import { useDispatch } from "react-redux";

export default function ConfirmModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.deleteModal);
  const task = useSelector((state) => state.modals.task);

  const { mutate } = useStaticTask();

  const handleClose = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLDivElement>,
    isUpdate?: boolean
  ) => {
    if (isUpdate) {
      removeTask(task.id);
    }
    dispatch(closeModal());
  };

  // タスクを削除する
  const removeTask = async (id: number) => {
    await fetch("/api/task", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    mutate();
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
          削除確認
        </DialogHeader>
        <DialogBody placeholder={undefined}>
          「{task.title}」を本当に削除してよろしいですか？
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
            <span>削除</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
