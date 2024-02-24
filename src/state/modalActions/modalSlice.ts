import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  isModalopen: boolean;
  taskObj: any
}

const initialState: modalState = {
  isModalopen: false,
  taskObj: {
    id: '',
    title: '',
    description: '',
    isCompleted: '',
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isModalopen = false;
    },
    openModal: (state, action) => {
      state.isModalopen = true;
      state.taskObj = action.payload;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;

export default modalSlice.reducer;
