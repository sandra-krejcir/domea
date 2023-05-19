import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { findAdmins, findOne } from "../../components/users/usersSlice";
import { UsersEntity } from "components/users/usersEntity";

export function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.users.user);
  const admins: UsersEntity[] = useSelector(
    (state: RootState) => state.users.admins
  );
  if (user) {
    console.log(
      "my user",
      user.tenant.problem.map((problem: any) => problem)
    );
  }
  console.log("my admins", admins);
  useEffect(() => {
    dispatch(findOne());
    dispatch(findAdmins());
  }, []);
  return (
    <View>
      {admins &&
        admins.map((admin: any) => (
          <>
            <Text>{admin.username}</Text>
            <Text>{admin.boardMember.phone}</Text>
            <Text>{admin.role}</Text>
          </>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
});
