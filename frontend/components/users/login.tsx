import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { TextInput } from "react-native-paper";
import { login, signup, updateRole, updateToken } from "./usersSlice";
import { UsersEntity } from "./usersEntity";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity } from "react-native-gesture-handler";

export function Login({ navigation }) {
  const token: string | null | undefined = useSelector(
    (state: RootState) => state.users.token
  );
  const error: string | undefined = useSelector(
    (state: RootState) => state.users.error
  );
  const role: string | null | undefined = useSelector(
    (state: RootState) => state.users.token
  );
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSuccess = () => {
    dispatch(login(new UsersEntity(username, password)));
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const token = await SecureStore.getItemAsync("token");
      const role = await SecureStore.getItemAsync("role");

      if (role === "admin") {
        navigation.navigate("FrontpageAdmin");
      } else if (role === "user") {
        navigation.navigate("FrontpageTenant");
      } else console.log(role);
    };
    asyncFunc();
  }, [token, role]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/green-gradient.png")}
      />
      <Text h1 h1Style={styles.h1}>
        Login
      </Text>
      <Text style={styles.text}>Welcome back! Please enter your details.</Text>
      <View style={styles.form}>
        <TextInput
          onChangeText={setUsername}
          value={username}
          label="Username *"
          mode="outlined"
          outlineColor="#D0D5DD"
          outlineStyle={{ borderWidth: 2 }}
          activeOutlineColor="#A5ED7B"
          selectionColor="black"
          textColor="black"
          style={styles.input}
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          label="Password *"
          mode="outlined"
          outlineColor="#D0D5DD"
          outlineStyle={{ borderWidth: 2 }}
          activeOutlineColor="#A5ED7B"
          selectionColor="black"
          textColor="black"
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLoginSuccess()}
        >
          <Text style={styles.buttontext}>{"Login"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    flex: 1,
    paddingTop: 95,
    paddingHorizontal: 20,
  },
  image: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  h1: {
    color: "#101828",
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    marginBottom: 8,
  },
  text: {
    color: "#667085",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    marginBottom: 32,
  },
  form: {
    flex: 1,
    gap: 20,
  },
  input: {
    backgroundColor: "white",
    color: "black",
  },
  button: {
    backgroundColor: "#101828",
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  buttontext: {
    color: "white",
    fontSize: 14,
    lineHeight: 26,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
