import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { View, Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, BottomSheet, Divider } from "@rneui/themed";
import { TextInput } from "react-native-paper";
import { TenantEntity } from "./tenantEntity";
import { createTenant } from "../../components/users/usersSlice";
import { TouchableOpacity } from "react-native-gesture-handler";

export function TenantFormAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");
  const feedback = useSelector((state: RootState) => state.users.error);

  const handleSubmit = async () => {
    await dispatch(
      createTenant(
        new TenantEntity(username, password, firstname, lastname, phone)
      )
    );
    setErrorMsg(feedback);
    setUsername("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setPhone("");
  };

  const validForm = () => {
    if (username && password && firstname && lastname && phone) return true;
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <Image
        style={styles.image}
        source={require("../../assets/green-gradient.png")}
      />
      <Text h1 h1Style={styles.h1}>
        Create tenant
      </Text>
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
        <TextInput
          onChangeText={setFirstname}
          value={firstname}
          label="First name *"
          mode="outlined"
          outlineColor="#D0D5DD"
          outlineStyle={{ borderWidth: 2 }}
          activeOutlineColor="#A5ED7B"
          selectionColor="black"
          textColor="black"
          style={styles.input}
        />
        <TextInput
          onChangeText={setLastname}
          value={lastname}
          label="Last name *"
          mode="outlined"
          outlineColor="#D0D5DD"
          outlineStyle={{ borderWidth: 2 }}
          activeOutlineColor="#A5ED7B"
          selectionColor="black"
          textColor="black"
          style={styles.input}
        />
        <TextInput
          onChangeText={setPhone}
          value={phone}
          label="Phone nr. *"
          mode="outlined"
          outlineColor="#D0D5DD"
          outlineStyle={{ borderWidth: 2 }}
          activeOutlineColor="#A5ED7B"
          selectionColor="black"
          textColor="black"
          style={styles.input}
        />
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: validForm() ? "#101828" : "#F0F0F0" },
          ]}
          onPress={() => {
            if (validForm()) {
              handleSubmit();
            }
          }}
        >
          <Text style={[styles.buttontext, { color: "white" }]}>
            Create tenant
          </Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        onBackdropPress={() => {
          setErrorMsg("");
        }}
        isVisible={errorMsg ? true : false}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingBottom: 30,
          }}
        >
          <TouchableOpacity onPress={() => setErrorMsg("")}>
            <Text
              style={[
                styles.buttontext,
                { alignSelf: "flex-end", margin: 15, color: "#101828" },
              ]}
            >
              Close
            </Text>
          </TouchableOpacity>
          <Divider />
          <Image
            style={{
              width: 70,
              height: 70,
              marginTop: 40,
              marginLeft: 70,
              marginRight: 70,
              marginBottom: 10,
              alignSelf: "center",
            }}
            source={require("../../assets/confirm.png")}
          ></Image>
          <Text style={styles.feedbacktext}>{errorMsg}</Text>
        </View>
      </BottomSheet>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    flex: 1,
    padding: 20,
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
    paddingTop: 20,
    paddingBottom: 32,
  },
  form: {
    gap: 20,
  },
  input: {
    backgroundColor: "white",
    color: "black",
  },
  button: {
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  buttontext: {
    fontSize: 14,
    lineHeight: 26,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  bottomsheet: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    paddingBottom: 80,
  },
  feedbacktext: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "600",
    marginBottom: 40,
  },
});
