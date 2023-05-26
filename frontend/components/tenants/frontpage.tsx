import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, StyleSheet, Button, ScrollView, Image, TouchableOpacity } from "react-native";
import { login, signup, updateToken } from "../users/usersSlice";
import { UsersEntity } from "../users/usersEntity";
import * as SecureStore from "expo-secure-store";
import { Divider } from "@rneui/themed";

export function FrontpageTenant(navigation) {
  const token: string | null | undefined = useSelector(
    (state: RootState) => state.users.token
  );
  const error: string | undefined = useSelector(
    (state: RootState) => state.users.error
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const asyncFunc = async () => {
      const token = await SecureStore.getItemAsync("token");
      dispatch(updateToken(token));

      console.log("token is", token);
    };
    asyncFunc();
  }, []);

  const text1 = {
    title: "Servicecenter lukker om",
    time: "3 timer 45min",
  };
  const text2 = {
    title: "Ejendomskontor lukker om",
    time: "5 timer 30min",
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView>
        {/* <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Søg efter dokumenter, artikler m.m"
          placeholderTextColor="#1A1B22"
        ></TextInput>
        <Image source={require("../../assets/search.png")}></Image>
      </View>
      */}
        <View style={styles.mainContainer}>
          <View style={{ marginBottom: 10 }}>
            <Text h4 style={[styles.title, { marginBottom: 5 }]}>
              Resident support
            </Text>
          </View>
          <View style={styles.container}>
            <View>
              <Image
                style={styles.image}
                source={require("../../assets/customer-service.png")}
              ></Image>
            </View>
            <View style={styles.bubbleText}>
              <Text style={{ fontWeight: "600" }}>{text1.title}</Text>
              <Text style={styles.text}>{text1.time}</Text>
            </View>
          </View>

          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("../../assets/office-service.png")}
            ></Image>
            <View style={styles.bubbleText}>
              <Text style={{ fontWeight: "600" }}>{text2.title}</Text>
              <Text style={styles.text}>{text2.time}</Text>
            </View>
          </View>
          <Divider
            style={{ marginTop: 25, marginBottom: 25 }}
            width={1.5}
            color="#D0D5DD"
          />

          <View style={styles.problems}>
            <View>
              <Text style={styles.title} h4>
                My Problems
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true}>
            <View style={[styles.myProblemsContainer, { marginTop: 10 }]}>
              {user &&
                user.tenant.problem.map((problem: any) => (
                  <View>
                    <View style={styles.problemContainer}>
                      <View>
                        <Text
                          style={[
                            styles.problemContainerTitle,
                            { color: "white" },
                          ]}
                          h4
                        >
                          {problem.subject}
                        </Text>
                        <Text
                          style={[
                            styles.problemContainerDepartment,
                            { color: "white" },
                          ]}
                        >
                          {problem.department}
                        </Text>
                      </View>
                      <Image
                        style={styles.problemContainerImage}
                        source={{ uri: `${problem.image}` }}
                      />
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
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
  }, */
  text: {
    fontSize: 25,
    fontWeight: "500",
    marginTop: -2,
  },
  title: {
    marginTop: 20,
    fontWeight: "500",
  },
  seeAll: {
    marginTop: 25,
    fontSize: 15,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    marginBottom: 5,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#D0D5DD",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
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
  },
  image: {
    flex: 1,
    padding: 5,
    marginBottom: 25,
    width: 40,
    height: 40,
  },
  problemContainer: {
    width: 250,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: "#101828",

    padding: 10,
  },
  problemContainerTitle: {
    display: "flex",
    padding: 10,
    justifyContent: "flex-start",
  },
  problemContainerDepartment: {
    display: "flex",
    paddingLeft: 10,
    marginBottom: 10,
    justifyContent: "flex-start",
  },
  problemContainerImage: {
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    width: 210,
    height: 250,
    alignSelf: "center",
    borderRadius: 15,
  },
  myProblemsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
});
