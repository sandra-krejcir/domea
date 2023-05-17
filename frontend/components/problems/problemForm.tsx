import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { createProblem, fetchAllProblems } from "./problemsSlice";
import { ProblemEntity } from "./problemsEntity";
import { View, Text, TextInput, StyleSheet, Button, Image } from "react-native";
import { Picture } from "./picture";
import * as ImagePicker from "expo-image-picker";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { MediaType } from "expo-media-library";

export function Problems() {
  const problems: ProblemEntity[] = useSelector(
    (state: RootState) => state.problems.problems
  );
  const [camera, setCamera] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [photoDisplayURL, setPhotoDisplayURL] = useState("hi");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    dispatch(
      createProblem(new ProblemEntity(subject, description, photoDisplayURL))
    );
    console.log("here", photoDisplayURL);
  };

  useEffect(() => {
    dispatch(fetchAllProblems());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {camera ? (
        <Picture
          setCamera={setCamera}
          setPhotoDisplayURL={setPhotoDisplayURL}
          photoDisplayURL={photoDisplayURL}
        ></Picture>
      ) : (
        <>
          <TextInput
            style={styles.input}
            onChangeText={setSubject}
            value={subject}
          />
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
          />

          <Button title="Open camera" onPress={() => setCamera(true)} />
          <Button title="Create problem" onPress={handleSubmit} />
        </>
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
