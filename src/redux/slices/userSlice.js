import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  username: "",
  name: "",
  image: "",
  id: "",
  email: "",
  phoneno: "",
  account_type: "",
  is_blocked:false
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log(action.payload.account_type);
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.image = action.payload.image;
      state.email = action.payload.email;
      state.phoneno = action.payload.phoneno;
      state.account_type = action.payload.account_type
      state.is_blocked = action.payload.is_blocked
    },
  },
});
export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
