import axios from "axios";
import { Platform } from "react-native";
import { UsersEntity } from "./usersEntity";

export class UsersAPI {
  static baseUrl: string = "https://b517-5-179-80-205.eu.ngrok.io";

  static async signup(user: UsersEntity) {
    try {
      const result = await axios.post(this.baseUrl + "auth/signup", user);
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {}
  }

  static async login(user: UsersEntity) {
    // try {
    const result = await axios.post(
      "https://b517-5-179-80-205.eu.ngrok.io/auth/login",
      user
    );

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
