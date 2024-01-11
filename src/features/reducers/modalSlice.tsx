import { Task } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modals",
  initialState: {
    editModal: false,
    deleteModal: false,
    task: { id: -1, title: "", content: "", status: -1 } as Task,
  },
  reducers: {
    openEditModal: (state, action) => {
      state.task = action.payload;
      state.editModal = true;
    },
    openDeleteModal: (state, action) => {
      state.task = action.payload;
      state.deleteModal = true;
    },
    closeModal: (state) => {
      state.editModal = false;
      state.deleteModal = false;
    },
  },
});

export const { openEditModal, openDeleteModal, closeModal } =
  modalSlice.actions;

export default modalSlice.reducer;
