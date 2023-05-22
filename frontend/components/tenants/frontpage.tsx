import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, StyleSheet, Button, Image } from "react-native";
import { login, signup, updateToken } from "../users/usersSlice";
import { UsersEntity } from "../users/usersEntity";
import * as SecureStore from "expo-secure-store";
import { ScrollView } from "react-native-gesture-handler";
import { SearchBar } from "@rneui/themed";

export function FrontpageTenant() {
  const token: string | null | undefined = useSelector(
    (state: RootState) => state.users.token
  );
  const error: string | undefined = useSelector(
    (state: RootState) => state.users.error
  );
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSuccess = (event: any) => {
    event.preventDefault();

    dispatch(login(new UsersEntity(username, password)));
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const token = await SecureStore.getItemAsync("token");
      dispatch(updateToken(token));

      console.log("token is", token);
    };
    asyncFunc();
  }, []);

  /* return (
    <View>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Create tenant" onPress={handleLoginSuccess} />

      <Text>token is {token}</Text>
      <Text>{error}</Text>
    </View>
  );
} */

  const text1 = {
    icon: "🎧",
    title: "Servicecenter lukker om",
    description: "3 timer 45min",
  };
  const text2 = {
    icon: "👨‍💻",
    title: "Ejendomskontor lukker om",
    description: "5 timer 30min",
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.text}>🏠 Blommegården</Text>
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Søg efter dokumenter, artikler m.m"
          placeholderTextColor="#1A1B22"
        ></TextInput>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text>{text1.icon}</Text>
          <Text>{text1.title}</Text>
          <Text style={styles.text}> {text1.description}</Text>
        </View>

        <View style={styles.container}>
          <Text>{text2.icon}</Text>
          <Text>{text2.title}</Text>
          <Text style={styles.text}>{text2.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: "lightgrey",
    backgroundColor: "#F3F3F3",
  },
  text: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    margin: 5,
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#D0D5DD",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 20,
    padding: 20,
    justifyContent: "space-evenly",
    borderRadius: 15,
  },
});
