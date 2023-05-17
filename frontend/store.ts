import { configureStore } from "@reduxjs/toolkit";
import problemsReducer from "./components/problems/problemsSlice";
import usersReducer from "./components/users/usersSlice";

export const store = configureStore({
  reducer: {
    problems: problemsReducer,
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
