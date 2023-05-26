import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Touchable,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { findOne } from "../users/usersSlice";
import { UsersEntity } from "components/users/usersEntity";
import { Tab, Text, TabView, Divider } from "@rneui/themed";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { deleteProblem } from "./problemsSlice";

const { width } = Dimensions.get("window");
const gap = 15;
const itemPerRow = 2.5;
const windowWidth = width;
const childWidth = windowWidth / itemPerRow;

export function Categories({ setProblemDepartment }) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.users.user);
  const [selectedView, setSelectedView] = useState(0);
  const categories = [
    { title: "Bathroom & Kitchen" },
    { title: "Pest infestation" },
    { title: "Heating, doors & windows" },
    { title: "Other problems" },
  ];

  useEffect(() => {
    dispatch(findOne());
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%", paddingTop: 25 }}>
      <>
        <Tab
          value={selectedView}
          onChange={(e) => setSelectedView(e)}
          style={{ width: 250, marginLeft: 15, marginRight: 15 }}
          indicatorStyle={{ width: 125, backgroundColor: "#A5ED7B" }}
          dense
        >
          <Tab.Item
            title="Categories"
            titleStyle={{
              color: !selectedView ? "black" : "grey",
              fontWeight: !selectedView ? "700" : "400",
            }}
          />
          <Tab.Item
            title="My Cases"
            titleStyle={{
              color: selectedView ? "black" : "grey",
              fontWeight: selectedView ? "700" : "400",
            }}
          />
        </Tab>
        <Divider
          width={1.5}
          style={{ marginTop: -2, zIndex: -1, marginLeft: 15, marginRight: 15 }}
        />
        <TabView
          value={selectedView}
          onChange={setSelectedView}
          animationType="spring"
          containerStyle={{ marginTop: 5 }}
        >
          <TabView.Item style={{ width: "100%" }}>
            <View
              style={{
                marginLeft: 15,
                marginRight: 15,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginVertical: -(gap / 2),
                  marginHorizontal: -(gap / 2),
                  justifyContent: "center",
                }}
              >
                {categories.map((category: any) => (
                  <TouchableOpacity
                    style={{
                      width: 165,
                      height: 165,
                      margin: 5,
                      borderRadius: 17,
                      borderColor: "#F2F4F7",
                      borderStyle: "dashed",
                      backgroundColor: "#F2F4F7",
                      borderWidth: 2,
                    }}
                    onPress={() => setProblemDepartment(category.title)}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        marginLeft: 25,
                        marginTop: 25,
                      }}
                      source={getImage(category.title)}
                    />
                    <Text
                      style={{
                        width: 110,
                        marginLeft: 25,
                        marginTop: 45,
                        fontWeight: "700",
                      }}
                    >
                      {category.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/*  {user.tenant.problem.map((problem: any) => (
                <>
                  <Text>{problem.subject}</Text>
                  <Text>{problem.description}</Text>
                </>
              ))} */}
            </View>
          </TabView.Item>
          <TabView.Item style={{ width: "100%" }}>
            <ScrollView style={{ marginBottom: 20 }}>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    marginVertical: -(gap / 2),
                    marginHorizontal: -(gap / 2),
                    alignSelf: "center",
                  }}
                >
                  {user &&
                    user.tenant.problem.map((problem: any) => (
                      <View
                        style={{
                          marginHorizontal: gap / 2,
                          width: width - gap * 2,
                          margin: 15,
                          borderRadius: 17,
                          backgroundColor: "#101828",
                          borderWidth: 2,
                          padding: 20,
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row-reverse",
                            justifyContent: "flex-start",
                            marginTop: -10,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(deleteProblem(problem.id));
                              dispatch(findOne());
                            }}
                          >
                            <Image
                              style={{ width: 30, height: 30 }}
                              source={require("../../assets/trash.png")}
                            />
                          </TouchableOpacity>
                          <Text
                            h4
                            style={{
                              marginRight: 140,
                              color: "white",
                            }}
                          >
                            {problem.subject}
                          </Text>
                        </View>
                        <Text
                          style={{
                            width: "100%",
                            fontWeight: "600",
                            color: "white",
                            marginBottom: 10,
                          }}
                        >
                          {problem.department}
                        </Text>
                        <Text
                          style={{
                            width: "100%",
                            marginBottom: 20,
                            color: "white",
                          }}
                        >
                          {problem.description}
                        </Text>
                        <Image
                          style={{
                            width: width - gap * 5,
                            height: width + gap * 1.5,
                            alignSelf: "center",
                            borderRadius: 5,
                          }}
                          source={{ uri: `${problem.image}` }}
                        />
                      </View>
                    ))}
                </View>
              </View>
            </ScrollView>
          </TabView.Item>
        </TabView>
      </>
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

function getImage(title: string) {
  const imgTitle = String(title);
  switch (imgTitle) {
    case "Bathroom & Kitchen":
      return require(`../../assets/toilet.png`);
    case "Pest infestation":
      return require(`../../assets/pest.png`);
    case "Heating, doors & windows":
      return require(`../../assets/heat.png`);
    case "Other problems":
      return require(`../../assets/other.png`);
  }
}
