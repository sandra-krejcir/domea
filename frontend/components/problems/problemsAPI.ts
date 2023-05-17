import axios from "axios";
import { Platform } from "react-native";
import { ProblemEntity } from "./problemsEntity";

export class ProblemsAPI {
  static async create(problem: ProblemEntity) {
    console.log("sending data");
    try {
      console.log("sending data", problem);

      const result = await axios.post(
        "https://924e-5-179-80-205.eu.ngrok.io/problems",
        { data: problem, headers: { "Content-Type": "multipart/form-data" } }
      );
      return result.data;
    } catch (error) {}
  }

  static async fetchAllProblems() {
    try {
      const result = await axios.get(
        "https://924e-5-179-80-205.eu.ngrok.io/problems"
      );
      console.log(result);

      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
}
