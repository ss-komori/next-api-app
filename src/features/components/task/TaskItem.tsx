import { Status, isDone } from "@/Enum/status";
import { Task } from "@/types";

import React, { useState } from "react";
import TaskEditModal from "./TaskEditModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  CheckCircle,
  NotStarted,
  PanoramaFishEye,
  RunCircle,
} from "@mui/icons-material";
import { openDeleteModal, openEditModal } from "@/features/reducers/modalSlice";
import { useDispatch } from "react-redux";

export const TaskItem = (props: { task: Task }) => {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(openEditModal(props.task));
  };

  const handleOpenDeleteModal = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    dispatch(openDeleteModal(props.task));
  };

  let statusValues = {
    state: "",
    color: "",
    iconDom: <></>,
  };

  switch (props.task.status) {
    case Status.done:
      statusValues.state = "完了";
      statusValues.color = "green";
      statusValues.iconDom = (
        <CheckCircle className="w-6 h-6 text-white fill-current" />
      );
      break;
    case Status.inProgress:
      statusValues.state = "進行中";
      statusValues.color = "blue";
      statusValues.iconDom = (
        <RunCircle className="w-6 h-6 text-white fill-current" />
      );
      break;
    case Status.notStarted:
      statusValues.state = "未対応";
      statusValues.color = "blue-gray";
      statusValues.iconDom = (
        <NotStarted className="w-6 h-6 text-white fill-current" />
      );
      break;
    default:
      statusValues.state = "No Status";
      statusValues.color = "gray";
      statusValues.iconDom = (
        <PanoramaFishEye className="w-6 h-6 text-white fill-current" />
      );
  }

  return (
    <>
      <div className="flex w-full border border-gray-300 max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div
          className="flex w-full border border-gray-300 overflow-hidden bg-white rounded-lg shadow-md hover:bg-gray-300"
          onClick={handleOpen}
        >
          <div
            className={`flex items-center justify-center w-12 bg-${statusValues.color}-500`}
          >
            {statusValues.iconDom}
          </div>

          <div className="px-2 p-1 w-full">
            <div className="px-1">
              <div className="flex justify-start items-center">
                <div className="flex-auto ">
                  <span className="text-sm text-gray-700">
                    {props.task.title}
                  </span>
                </div>
                <span
                  className={`font-semibold text-sm whitespace-pre text-${statusValues.color}-500`}
                >
                  {statusValues.state}
                  <button
                    type="button"
                    className="text-white bg-red-500  hover:bg-red-700  focus:ring-red-300 font-medium rounded-full text-xs p-1 ms-1 text-center items-center"
                    onClick={handleOpenDeleteModal}
                  >
                    <span>
                      <DeleteForeverIcon />
                    </span>
                  </button>
                </span>
              </div>
              <div className="text-xs my-1 line-clamp-2 text-gray-600">
                {props.task.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
