import axios from "axios";
import { Platform } from "react-native";
import { ProblemEntity } from "./problemsEntity";
import { BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";

export class ProblemsAPI {
  static async create(problem: ProblemEntity) {
    try {
      const token = await SecureStore.getItemAsync("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axios.post(BASE_URL + "/problems", problem, {
        headers,
      });
      return result.data;
    } catch (error) {}
  }

  static async fetchAllProblems() {
    try {
      const result = await axios.get(BASE_URL + "/problems");
      console.log(result);

      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  static async delete(id: number) {
    try {
      const result = await axios.delete(BASE_URL + "/problems/" + id);
      console.log(result);

      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
}
