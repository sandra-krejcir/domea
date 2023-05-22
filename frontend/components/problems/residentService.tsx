import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { findAdmins, findOne } from "../../components/users/usersSlice";
import { UsersEntity } from "components/users/usersEntity";
import { Categories } from "./problemCategories";
import { ProblemsForm } from "./problemForm";

export function ResidentService() {
  const [problemDepartment, setProblemDepartment] = useState("");

  useEffect(() => {
    console.log("hi", problemDepartment);
  }, [problemDepartment]);

  return (
    <>
      {problemDepartment ? (
        <ProblemsForm
          setProblemDepartment={setProblemDepartment}
          problemDepartment={problemDepartment}
        />
      ) : (
        <Categories setProblemDepartment={setProblemDepartment} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
});
