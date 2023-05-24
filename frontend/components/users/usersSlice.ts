import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersAPI } from "./usersAPI";
import { UsersEntity } from "./usersEntity";
import * as SecureStore from "expo-secure-store";

// First, create the thunk
export const login = createAsyncThunk(
  "auth/login", // This is a name for the thunk (must be unique) not the endpoint
  async (user: UsersEntity, thunkAPI) => {
    const response = await UsersAPI.login(user);

    // save to secure store
    SecureStore.setItemAsync("token", response.access_token);
    SecureStore.setItemAsync("role", response.role);

    return response;
  }
);
export const signup = createAsyncThunk(
  "auth/signup", // This is a name for the thunk (must be unique) not the endpoint
  async (user: UsersEntity, thunkAPI) => {
    const response = UsersAPI.signup(user);

    return response;
  }
);

export const findOne = createAsyncThunk(
  "getUser", // This is a name for the thunk (must be unique) not the endpoint
  async (thunkAPI) => {
    const response = await UsersAPI.findOne();

    console.log("the user", response);
    return response;
  }
);

export const findAdmins = createAsyncThunk(
  "admins", // This is a name for the thunk (must be unique) not the endpoint
  async (thunkAPI) => {
    const response = await UsersAPI.findAdmins();

    console.log("the admins", response);
    return response;
  }
);

interface UsersState {
  user: any | undefined;
  admins: any | undefined;
  token: string | undefined | null;
  role: string | undefined | null;
  userId: number;
  error: string | undefined;
}

const initialState = {
  user: undefined,
  admins: undefined,
  token: undefined,
  error: undefined,
  role: undefined,
  userId: 0,
} as UsersState;

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      console.log("updated token");
    },
    updateRole: (state, action: PayloadAction<string | null>) => {
      state.role = action.payload;
      console.log("updated role");
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("running signup fulfilled");
      state.error = undefined;
      if (action.payload.id != undefined) {
        state.error = "Signup success";
      }
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("running login fulfilled");
      state.error = undefined;
      state.token = action.payload?.access_token;
      state.role = action.payload?.role;
      state.userId = action.payload?.id;
      console.log(action.payload);
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.error.message === "Request failed with status code 401") {
        state.error = "Invalid login";
        state.token = undefined;
        state.role = undefined;
      }

      console.log("error in slice", action.error);
    });
    builder.addCase(findOne.fulfilled, (state, action) => {
      console.log("success", action.payload);
      state.error = undefined;
      state.user = action.payload;
    });
    builder.addCase(findOne.rejected, (state, action) => {
      if (action.error.message === "Request failed with status code 401") {
        state.error = "Invalid user";
        state.user = undefined;
      }

      console.log("error in user slice", action.error);
    });
    builder.addCase(findAdmins.fulfilled, (state, action) => {
      console.log("success", action.payload);
      state.error = undefined;
      state.admins = action.payload;
    });
    builder.addCase(findAdmins.rejected, (state, action) => {
      if (action.error.message === "Request failed with status code 401") {
        state.error = "Invalid user";
        state.admins = undefined;
      }

      console.log("error in user slice", action.error);
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateToken, updateRole } = usersSlice.actions;

export default usersSlice.reducer;

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))
