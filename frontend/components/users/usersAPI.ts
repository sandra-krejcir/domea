import axios from "axios";
import { Platform } from "react-native";
import { UsersEntity } from "./usersEntity";
import { BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";

export class UsersAPI {
  static async signup(user: UsersEntity) {
    try {
      const result = await axios.post(BASE_URL + "/auth/signup", user);
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {}
  }

  static async findOne() {
    try {
      const token = await SecureStore.getItemAsync("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axios.post(BASE_URL + "/getUser", null, {
        headers,
      });

      return result.data;
    } catch (error) {}
  }

  static async findAdmins() {
    try {
      const result = await axios.get(BASE_URL + "/admins");

      console.log("api", result.data);
      return result.data;
    } catch (error) {}
  }

  static async login(user: UsersEntity) {
    // try {
    const result = await axios.post(BASE_URL + "/auth/login", user);

    return result.data;
    // }
    // catch(error: any) {
    //     // console.log("error", error.response.data);
    //     // console.log("error", error.response.status);
    //     // console.log("error", error.response.headers);

    //     if (error.response.status === 401) {

    //     }
    // }
  }
}
