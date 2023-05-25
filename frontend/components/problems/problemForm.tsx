import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { createProblem, fetchAllProblems } from "./problemsSlice";
import { ProblemEntity } from "./problemsEntity";
import { View, StyleSheet, Button, Image } from "react-native";
import { Picture } from "./picture";
import * as ImagePicker from "expo-image-picker";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { MediaType } from "expo-media-library";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Text } from "@rneui/themed";
import { TextInput } from "react-native-paper";

export function ProblemsForm({ setProblemDepartment, problemDepartment }) {
  const problems: ProblemEntity[] = useSelector(
    (state: RootState) => state.problems.problems
  );
  const [camera, setCamera] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [photoDisplayURL, setPhotoDisplayURL] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const createdAt = new Date();

    dispatch(
      createProblem(
        new ProblemEntity(
          problemDepartment,
          subject,
          description,
          photoDisplayURL,
          createdAt
        )
      )
    );
  };

  useEffect(() => {
    console.log("here", photoDisplayURL);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        height: "100%",
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      {camera ? (
        <Picture
          setCamera={setCamera}
          setPhotoDisplayURL={setPhotoDisplayURL}
          photoDisplayURL={photoDisplayURL}
        ></Picture>
      ) : (
        <ScrollView style={{ marginBottom: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={() => setProblemDepartment("")}>
              <Image
                style={{ width: 35, height: 35 }}
                source={require(`../../assets/back.png`)}
              />
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {problemDepartment}
            </Text>
          </View>
          <Text h3 style={{ marginLeft: 10, marginTop: 35 }}>
            Describe your issue
          </Text>
          <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 5 }}>
            Write to your case worker about the issue you're having. Once you
            have opened the case, it will be sent to the administration and you
            will be contacted about it as soon as possible.
          </Text>
          <TextInput
            onChangeText={setSubject}
            value={subject}
            label="Subject *"
            mode="outlined"
            outlineColor="#D0D5DD"
            outlineStyle={{ borderWidth: 2 }}
            activeOutlineColor="#A5ED7B"
            selectionColor="black"
            textColor="black"
            style={{
              backgroundColor: "white",
              marginLeft: 10,
              marginRight: 10,
              marginTop: 15,
              color: "black",
            }}
          />
          <TextInput
            onChangeText={setDescription}
            value={description}
            label="Description *"
            mode="outlined"
            outlineColor="#D0D5DD"
            outlineStyle={{ borderWidth: 2 }}
            activeOutlineColor="#A5ED7B"
            selectionColor="black"
            textColor="black"
            style={{
              backgroundColor: "white",
              marginLeft: 10,
              marginRight: 10,
              marginTop: 15,
              color: "black",
            }}
            multiline
            maxLength={250}
          />
          {photoDisplayURL ? (
            <TouchableOpacity onPress={() => setCamera(true)}>
              <Image
                style={{
                  marginTop: 25,
                  width: "95%",
                  height: 400,
                  alignSelf: "center",
                  borderRadius: 5,
                }}
                source={{ uri: `${photoDisplayURL}` }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setCamera(true)}>
              <View
                style={{
                  borderColor: "#D0D5DD",
                  borderRadius: 5,
                  borderStyle: "solid",
                  borderWidth: 2,
                  marginTop: 25,
                  marginLeft: 10,
                  marginRight: 10,
                  height: 200,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 30, height: 30, marginBottom: 10 }}
                  source={require(`../../assets/documents.png`)}
                />
                <Text style={{ fontWeight: "700" }}>
                  Click to take a picture
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {photoDisplayURL && (
            <>
              <Button
                title="Delete Image"
                onPress={() => setPhotoDisplayURL("")}
              />
              <Button title="Retake Picture" onPress={() => setCamera(true)} />
            </>
          )}
          <TouchableOpacity
            style={{
              height: 60,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 5,
              backgroundColor: "#101828",
              marginTop: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => handleSubmit}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>SEND CASE</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* {problems?.map((problem) => (
            <View key={problem?.id}>
                <Text>{problem?.subject} - {problem?.description}</Text>
            </View>
        ))}  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
