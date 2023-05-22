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
    title: "Servicecenter lukker om",
    time: "3 timer 45min",
  };
  const text2 = {
    icon: "👨‍💻",
    title: "Ejendomskontor lukker om",
    time: "5 timer 30min",
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
          <View>
            <Image
              style={styles.image}
              source={require("../../assets/customer-service.png")}
            ></Image>
          </View>
          <View style={styles.bubbleText}>
            <Text>{text1.title}</Text>
            <Text style={styles.text}>{text1.time}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.image}>
            <Image source={require("../../assets/office-service.png")}></Image>
          </View>
          <View style={styles.bubbleText}>
            <Text>{text2.title}</Text>
            <Text style={styles.text}>{text2.time}</Text>
          </View>
        </View>

        <View style={styles.problems}>
          <View>
            <Text style={styles.title}>My Problems</Text>
          </View>
          <View>
            <Text style={styles.seeAll}>See all →</Text>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.container}>
            <Text>Picture 1</Text>
          </View>
          <View>
            <View style={styles.container}>
              <Text>Picture 2</Text>
            </View>
          </View>
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
    marginTop: 10,
    padding: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
  },
  seeAll: {
    marginTop: 20,
    fontSize: 10,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    margin: 3,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#D0D5DD",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
    padding: 20,
    justifyContent: "space-evenly",
    borderRadius: 15,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    justifyContent: "center",
    borderRadius: 15,
  },
  problems: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bubbleText: {
    flex: 1,
    marginTop: 5,
  },
  image: {
    flex: 1,
    margin: 5,
  },
});
