import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, StyleSheet, Button, Image } from "react-native";
import { findOne, login, signup, updateToken } from "../users/usersSlice";
import { UsersEntity } from "../users/usersEntity";
import * as SecureStore from "expo-secure-store";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { IconComponentProvider, Icon } from "@react-native-material/core";

export function FrontpageTenant() {
  const token: string | null | undefined = useSelector(
    (state: RootState) => state.users.token
  );
  const error: string | undefined = useSelector(
    (state: RootState) => state.users.error
  );

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.users.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSuccess = (event: any) => {
    event.preventDefault();

    dispatch(login(new UsersEntity(username, password)));
  };

  useEffect(() => {
    dispatch(findOne());
  }, []);

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
    title: "Ejendomskontor lukker om",
    time: "5 timer 30min",
  };

  return (
    <ScrollView>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Søg efter dokumenter, artikler m.m"
          placeholderTextColor="#1A1B22"
        ></TextInput>
        <Image source={require("../../assets/search.png")}></Image>
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

        <ScrollView horizontal={true} style={{ marginBottom: 20 }}>
          <View
            style={{
              marginLeft: 15,
              marginRight: 15,
              marginTop: 15,
            }}
          >
            <View
              style={{
                alignSelf: "center",
              }}
            >
              {user &&
                user.tenant.problem.map((problem: any) => (
                  <View
                    style={{
                      width: "100%",
                      margin: 20,
                      borderRadius: 17,
                      borderColor: "#F2F4F7",
                      borderStyle: "dashed",
                      backgroundColor: "#F2F4F7",
                      borderWidth: 2,
                      padding: 20,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "128%",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "70%",
                          alignItems: "center",
                          marginTop: 5,
                        }}
                      >
                        <Text
                          h3
                          style={{
                            marginBottom: 7,
                          }}
                        >
                          {problem.subject}
                        </Text>
                        <Text
                          style={{
                            width: "100%",
                          }}
                        >
                          - DEPARTMENT
                        </Text>
                      </View>
                    </View>
                    <Image
                      style={{
                        width: 100,
                        height: 200,
                        alignSelf: "center",
                      }}
                      source={{ uri: `${problem.image}` }}
                    />
                  </View>
                ))}
            </View>
            {/*  {user.tenant.problem.map((problem: any) => (
                <>
                  <Text>{problem.subject}</Text>
                  <Text>{problem.description}</Text>
                </>
              ))} */}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  searchInput: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 25,
    borderColor: "lightgrey",
    backgroundColor: "#F3F3F3",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
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
