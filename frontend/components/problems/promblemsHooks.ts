import axios from "axios";
import { ProblemEntity } from "./problemsEntity";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";

/* export const useGetProblems = () => {
  const fetchProblems = async () => {
    return await axios.get(BASE_URL + "/problems");
  };
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["problems"],
    queryFn: fetchProblems,
  });
  return { isLoading, isError, data: data?.data, error };
}; */

export const usePostProblem = () => {
  return useMutation({
    mutationFn: async (newProblem: ProblemEntity) => {
      const token = await SecureStore.getItemAsync("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      return await axios.post(BASE_URL + "/problems", newProblem, {
        headers,
      });
    },
  });
};
