import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { findAdmins, login, signup, updateToken } from "../users/usersSlice";
import { UsersEntity } from "../users/usersEntity";
import * as SecureStore from "expo-secure-store";
import { Tab, Text, TabView, Divider, BottomSheet } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";

export function FrontpageAdmin() {
  const [selectedView, setSelectedView] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [chosenAdmin, setChosenAdmin] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const userId: number = useSelector((state: RootState) => state.users.userId);
  const fetchedAdmins: UsersEntity[] = useSelector(
    (state: RootState) => state.users.admins
  );
  let admins: any = [];

  if (fetchedAdmins) {
    console.log("This shit", fetchedAdmins);
    fetchedAdmins.map((admin: any) => {
      if (admin.id !== userId) {
        admins.push(admin);
      }
    });
    console.log("the ad", admins);
  }

  useEffect(() => {
    dispatch(findAdmins());
  }, []);
  const complex = {
    complexName: "20-1 : Vejgårdspark",
    complexAddress: "Vejgårdspark 1-153, 2-126",
    city: "Virum",
    postCode: "3520",
    typeRegion: "General Housing/ Copenhagen N",
    financialYear: [
      { period: "01-01-2022 - 31.12.2021", topic: "a/c heating" },
      { period: "01-01-2022 - 31.12.2021", topic: "a/c water" },
    ],
    complexNr: 100,
    housingComNr: 856,
    CVR: "14811281",
    catastre: "3BF Stavnsholt By, Farum",
    companyNr: 2001,
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "300%",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 25,
      }}
    >
      <Text h3 style={{ fontWeight: "700", color: "#101828" }}>
        Complex
      </Text>
      <Text h3 style={{ fontWeight: "700", color: "#101828" }}>
        {complex.complexName}
      </Text>
      <Text style={{ marginTop: 5, fontSize: 20, color: "#667085" }}>
        {complex.complexAddress}
      </Text>
      <Text style={{ color: "#667085", fontSize: 20 }}>{complex.city}</Text>
      <Divider width={1.5} style={{ marginTop: 10 }} />
      <Text
        style={{
          fontWeight: "700",
          color: "#101828",
          fontSize: 16,
          marginTop: 25,
        }}
      >
        Type/Municipality/Region:
      </Text>
      <Text
        style={{
          color: "#667085",
          fontSize: 18,
          marginTop: 10,
          width: "65%",
        }}
      >
        {complex.typeRegion}
      </Text>
      <Divider width={1.5} style={{ marginTop: 10 }} />
      <Text
        style={{
          fontWeight: "700",
          color: "#101828",
          fontSize: 16,
          marginTop: 25,
        }}
      >
        Financial year:{" "}
      </Text>
      {complex.financialYear.map((billing: any) => (
        <View style={{ marginTop: 10, display: "flex", flexDirection: "row" }}>
          <Text style={{ color: "#667085", fontSize: 18 }}>
            {billing.period} :{" "}
          </Text>
          <Text style={{ color: "#667085", fontSize: 18 }}>
            {billing.topic}
          </Text>
        </View>
      ))}
      <Divider width={1.5} style={{ marginTop: 10 }} />
      <View
        style={{
          marginTop: 25,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            color: "#101828",
            fontSize: 16,
          }}
        >
          LBF Complex nr. :
        </Text>
        <Text style={{ color: "#667085", fontSize: 18 }}>
          {complex.complexNr}
        </Text>
      </View>
      <View
        style={{
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            color: "#101828",
            fontSize: 16,
          }}
        >
          LBF Housing Company nr. :
        </Text>
        <Text style={{ color: "#667085", fontSize: 18 }}>
          {complex.housingComNr}
        </Text>
      </View>
      <View
        style={{
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            color: "#101828",
            fontSize: 16,
          }}
        >
          CVR :
        </Text>
        <Text style={{ color: "#667085", fontSize: 18 }}>{complex.CVR}</Text>
      </View>
      <View
        style={{
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            color: "#101828",
            fontSize: 16,
          }}
        >
          Catastre :
        </Text>
        <Text style={{ color: "#667085", fontSize: 18 }}>
          {complex.catastre}
        </Text>
      </View>
      <View
        style={{
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            color: "#101828",
            fontSize: 16,
          }}
        >
          Company nr. :
        </Text>
        <Text style={{ color: "#667085", fontSize: 18 }}>
          {complex.companyNr}
        </Text>
      </View>
      <Tab
        value={selectedView}
        onChange={(e) => setSelectedView(e)}
        style={{ width: 280, marginTop: 35 }}
        indicatorStyle={{ width: 140, backgroundColor: "#A5ED7B" }}
        dense
      >
        <Tab.Item
          title="Case workers"
          titleStyle={{
            color: !selectedView ? "black" : "grey",
            fontWeight: !selectedView ? "700" : "400",
          }}
        />
        <Tab.Item
          title="Contact"
          titleStyle={{
            color: selectedView ? "black" : "grey",
            fontWeight: selectedView ? "700" : "400",
          }}
        />
      </Tab>
      <Divider width={1.5} style={{ marginTop: -2, zIndex: -1 }} />
      <TabView
        value={selectedView}
        onChange={setSelectedView}
        animationType="spring"
        containerStyle={{ marginTop: 5 }}
      >
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            <View style={{ marginBottom: 150 }}>
              <View>
                {fetchedAdmins &&
                  admins &&
                  admins.map((admin: any) => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 15,
                        paddingLeft: 10,
                        paddingRight: 15,
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{ width: 50, height: 50 }}
                          source={require("../../assets/adminIcon.png")}
                        ></Image>
                        <View style={{ marginLeft: 15 }}>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 5,
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "700",
                                color: "#101828",
                                fontSize: 16,
                              }}
                            >
                              {admin.boardMember.firstname}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "700",
                                color: "#101828",
                                fontSize: 16,
                              }}
                            >
                              {admin.boardMember.lastname}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontWeight: "500",
                              color: "#667085",
                              fontSize: 16,
                            }}
                          >
                            {admin.boardMember.phone}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setIsVisible(true);
                          setChosenAdmin(admin.id);
                        }}
                        style={{ alignItems: "center" }}
                      >
                        <View
                          style={{
                            backgroundColor: "#101828",
                            borderRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "500",
                              color: "#F2F4F7",
                              fontSize: 14,
                              padding: 10,
                              textAlign: "center",
                            }}
                          >
                            Show
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            </View>
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}></TabView.Item>
      </TabView>
      <BottomSheet isVisible={isVisible}>
        {admins &&
          admins.map((admin: any) => {
            if (admin.id === chosenAdmin) {
              console.log("the one", admin);
              return (
                <View style={{ height: 300, backgroundColor: "white" }}>
                  <Text>{admin.boardMember.firstname}</Text>
                  <Button
                    title="Close"
                    onPress={() => {
                      setIsVisible(false);
                      setChosenAdmin(0);
                    }}
                  />
                </View>
              );
            }
          })}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
