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
import { Tab, Text, TabView, Divider, BottomSheet, Icon } from "@rneui/themed";
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

  if (fetchedAdmins && fetchedAdmins.length > 0) {
    fetchedAdmins.map((admin: any) => {
      if (admin.id !== userId) {
        admins.push(admin);
      }
    });
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
                  admins.length > 0 &&
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
        <TabView.Item style={{ width: "100%" }}>
          <View>
            <View style={styles.bottomContactIconContainer}>
              <View style={styles.contactBubble}>
                <Image source={require("../../assets/contact.png")}></Image>
                <Text style={styles.contactBubbleText}>+45 54 63 21</Text>
              </View>
            </View>
            <View style={styles.bottomContactIconContainer}>
              <View style={styles.contactBubble}>
                <Image source={require("../../assets/email.png")}></Image>
                <Text style={styles.contactBubbleText}>contact@domea.com</Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  display: "flex",
                  backgroundColor: "#E4E7EC",
                  borderRadius: 10,
                  width: "auto",
                  marginTop: 5,
                  marginLeft: 15,
                  marginRight: 15,
                }}
              >
                <View style={styles.openingHoursContainer}>
                  <Text>Mon-Fri:</Text>
                  <Text>08:00 - 16:00</Text>
                </View>
                <View style={styles.openingHoursContainer}>
                  <Text>Sat-Sun:</Text>
                  <Text>11:00 - 16:00</Text>
                </View>
              </View>
            </View>
          </View>
        </TabView.Item>
      </TabView>
      <BottomSheet
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}
      >
        {admins &&
          admins.length > 0 &&
          admins.map((admin: any) => {
            if (admin.id === chosenAdmin) {
              return (
                <View
                  style={{
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: 20,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 15,
                      marginBottom: 15,
                    }}
                  >
                    <View></View>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          marginTop: 10,
                          marginBottom: 10,
                          marginLeft: 50,
                          fontSize: 18,
                        }}
                      >
                        Contact information
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                      onPress={() => setIsVisible(false)}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          marginTop: 10,
                          marginBottom: 10,
                          marginRight: 10,
                        }}
                      >
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Divider width={1} color="#D0D5DD" />
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        backgroundColor: "white",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={styles.adminImage}
                        source={require("../../assets/adminIcon.png")}
                      ></Image>
                    </View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        marginBottom: 20,
                      }}
                    >
                      {admin.boardMember.firstname} {admin.boardMember.lastname}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 20,
                      marginRight: 20,
                      gap: 10,
                    }}
                  >
                    <View style={styles.iconContainer}>
                      <View style={styles.contactButton}>
                        <Image
                          style={styles.image}
                          source={require("../../assets/contact.png")}
                        ></Image>
                        <Text style={styles.contactButtonText}>Call</Text>
                      </View>
                    </View>
                    <View style={styles.iconContainer}>
                      <View style={styles.contactButton}>
                        <Image
                          style={styles.image}
                          source={require("../../assets/email.png")}
                        ></Image>
                        <Text style={styles.contactButtonText}>Send mail</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ marginBottom: 70 }}>
                    <View style={styles.mainContainer}>
                      <View style={styles.container}>
                        <View style={{}}>
                          <Text style={{ color: "#667085" }}>Phone number</Text>
                          <Text style={{}}>{admin.boardMember.phone}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.mainContainer}>
                      <View style={styles.container}>
                        <View style={{}}>
                          <Text style={{ color: "#667085" }}>E-mail</Text>
                          <Text style={{}}>{admin.username}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.mainContainer}>
                      <View style={styles.container}>
                        <View style={{}}>
                          <Text style={{ color: "#667085" }}>Address</Text>
                          <Text style={{}}>
                            {admin.boardMember.address}{" "}
                            {admin.boardMember.zipCode} {admin.boardMember.city}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
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
  topBar: {
    display: "flex",
    flexDirection: "row",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "space-evenly",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#E4E7EC",
  },
  adminImage: {
    margin: 15,
    width: 100,
    height: 100,
  },
  image: {
    flex: 1,
    margin: 10,
    width: 30,
    height: 30,
  },
  contactImage: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    width: 10,
    height: 10,
  },
  iconContainer: {
    display: "flex",
    width: "50%",
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: "#101828",
  },
  bottomContactIconContainer: {
    display: "flex",
    width: "auto",
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 10,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: "#101828",
  },
  contactButton: {
    display: "flex",
    alignItems: "center",
  },
  contactButtonText: {
    color: "white",
    paddingBottom: 5,
  },

  contactBubble: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
  },
  contactBubbleText: {
    color: "white",
    marginLeft: 30,
  },

  openingHoursContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
