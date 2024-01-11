/**
 *
 */
export const Status = {
  notStatus: 0,
  notStarted: 1,
  inProgress: 2,
  done: 3,
} as const;

export type StatusType = (typeof Status)[keyof typeof Status];

// export const getStatusClassName = (status: number) => {
//   switch (status) {
//     case Status.notStarted:
//       return {
//         text: "未対応",
//         textColor: "text-gray-600",
//         bgColor: "bg-gray-600",
//       };
//     case Status.inProgress:
//       return {
//         text: "実行中",
//         textColor: "text-blue-600",
//         bgColor: "bg-blue-600",
//       };

//     case Status.done:
//       return {
//         text: "完了",
//         textColor: "text-emerald-500",
//         bgColor: "bg-emerald-500",
//       };
//     default:
//       return {
//         text: "",
//         textColor: "",
//         bgColor: "",
//       };
//   }
// };

export const getStatusName = (status: number) => {
  switch (status) {
    case Status.notStatus:
      return "No Status";
    case Status.notStarted:
      return "未対応";
    case Status.inProgress:
      return "進行中";
    case Status.done:
      return "完了";
  }
};
export type OptionStatusType = {
  key: number;
  status: string;
  color: string;
};

export const noStatusOption: OptionStatusType = {
  key: 0,
  status: "No Status",
  color: "gray",
};

export const optionStatus: OptionStatusType[] = [
  {
    key: 1,
    status: "未対応",
    color: "blue-gray",
  },
  {
    key: 2,
    status: "進行中",
    color: "blue",
  },
  {
    key: 3,
    status: "完了",
    color: "green",
  },
];

export const isDone = (status: number) => {
  return status === Status.done;
};
