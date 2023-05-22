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
import { useQueryClient } from "@tanstack/react-query";
import { usePostProblem } from "./promblemsHooks";

export function ProblemsForm({ setProblemDepartment, problemDepartment }) {
  const problems: ProblemEntity[] = useSelector(
    (state: RootState) => state.problems.problems
  );

  // Redux
  /* const count = useSelector((state: RootState) => state.counter.value);
  const problems: ProblemEntity[] = useSelector(
    (state: RootState) => state.problems.problems
  ); */

  /* const dispatch = useDispatch<AppDispatch>(); */

  /*  dispatch(
     createProblem(new ProblemEntity(subject, description, photoToDisplay))
   ); */
  /* useEffect(() => {
     dispatch(fetchAllProblems())
   }, []); */

  const [camera, setCamera] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [photoDisplayURL, setPhotoDisplayURL] = useState("");

  //React Query
  /* const { isLoading, error, data } = useGetProblems(); */
  const queryClient = useQueryClient();
  const { mutate: createProblem } = usePostProblem();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(`subject: ${subject}, description: ${description}`);
    const problemEntity: ProblemEntity = new ProblemEntity(
      problemDepartment,
      subject,
      description,
      photoDisplayURL,
      createdAt
    );
    createProblem(problemEntity, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["problems"] }),
    });
  };

  /* const createdAt = new Date();

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
 */
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
          <Button title="Go Back" onPress={() => setProblemDepartment("")} />
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
          {photoDisplayURL && (
            <Image
              style={{ width: 200, height: 400, alignSelf: "center" }}
              source={{ uri: `${photoDisplayURL}` }}
            />
          )}
          {photoDisplayURL ? (
            <>
              <Button
                title="Delete Image"
                onPress={() => setPhotoDisplayURL("")}
              />
              <Button title="Retake Picture" onPress={() => setCamera(true)} />
            </>
          ) : (
            <Button title="Take Picture" onPress={() => setCamera(true)} />
          )}
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
