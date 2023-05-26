import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { createProblem, fetchAllProblems } from "./problemsSlice";
import { ProblemEntity } from "./problemsEntity";
import {
  View,
  StyleSheet,
  Button,
  Image,
  GestureResponderEvent,
} from "react-native";
import { Picture } from "./picture";
import * as ImagePicker from "expo-image-picker";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { MediaType } from "expo-media-library";
import { useQueryClient } from "@tanstack/react-query";
import { usePostProblem } from "./promblemsHooks";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { BottomSheet, Text, Divider } from "@rneui/themed";
import { TextInput } from "react-native-paper";
import { findOne } from "../users/usersSlice";

export function ProblemsForm({ setProblemDepartment, problemDepartment }) {
  const problems: ProblemEntity[] = useSelector(
    (state: RootState) => state.problems.problems
  );
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    dispatch(findOne());
  }, []);

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
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  //React Query
  /* const { isLoading, error, data } = useGetProblems(); */
  const queryClient = useQueryClient();
  const { mutate: createProblem } = usePostProblem();

  const handleSubmit = () => {
    const createdAt = new Date();
    const problemEntity: ProblemEntity = new ProblemEntity(
      problemDepartment,
      subject,
      description,
      photoDisplayURL,
      createdAt
    );
    createProblem(problemEntity, {
      onSuccess: () => {
        setIsVisible(false);
        setError("Problem creation success");
        setSubject("");
        setDescription("");
        setPhotoDisplayURL("");
        /*  queryClient.invalidateQueries({ queryKey: ["problems"] }), */
      },
    });
  };

  /* const createdAt = new Date();

    console.log("hi");

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
    <View
      style={{
        flex: 1,
      }}
    >
      {camera ? (
        <Picture
          setCamera={setCamera}
          setPhotoDisplayURL={setPhotoDisplayURL}
          photoDisplayURL={photoDisplayURL}
        ></Picture>
      ) : (
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <ScrollView style={{ marginBottom: 30 }}>
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
              have opened the case, it will be sent to the administration and
              you will be contacted about it as soon as possible.
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
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Text
                  style={{ margin: 8 }}
                  onPress={() => setPhotoDisplayURL("")}
                >
                  Delete Image
                </Text>
                <Text style={{ margin: 8 }} onPress={() => setCamera(true)}>
                  Retake Picture
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={{
                height: 60,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 5,
                backgroundColor:
                  subject && description && photoDisplayURL
                    ? "#101828"
                    : "#F0F0F0",
                marginTop: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                if (subject && description && photoDisplayURL) {
                  setIsVisible(true);
                }
              }}
            >
              <Text style={{ color: "white", fontWeight: "700", fontSize: 14 }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      <BottomSheet
        onBackdropPress={() => {
          setIsVisible(false);
        }}
        isVisible={isVisible}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingBottom: 30,
          }}
        >
          <>
            <View
              style={{
                marginTop: 15,
                marginBottom: 15,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: 15,
                marginRight: 15,
              }}
            >
              <Text
                style={{ color: "#667085" }}
                onPress={() => setIsVisible(false)}
              >
                Cancel
              </Text>
              <Text
                style={{
                  color: "#101828",
                  fontSize: 18,
                  fontWeight: "600",
                  alignSelf: "center",
                  marginLeft: 20,
                }}
              >
                Case summery
              </Text>
              <Text
                style={{ color: "#039855", fontWeight: "500" }}
                onPress={() => handleSubmit()}
              >
                Send Case
              </Text>
            </View>
            <Divider width={1.5} style={{ opacity: 0.3 }} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 15,
              }}
            >
              <View style={{ margin: 20 }}>
                <Text
                  style={{
                    color: "#101828",
                    fontSize: 12,
                    fontWeight: "700",
                    marginBottom: 5,
                  }}
                >
                  CATEGORY
                </Text>
                <Text>{problemDepartment}</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    color: "#101828",
                    fontSize: 12,
                    fontWeight: "700",
                    marginBottom: 5,
                  }}
                >
                  SUBJECT
                </Text>
                <Text>{subject}</Text>
              </View>
            </View>
            <Divider
              width={1.5}
              style={{
                marginLeft: 15,
                marginRight: 15,
                opacity: 0.3,
              }}
            />
            <Text
              style={{
                color: "#101828",
                fontSize: 12,
                fontWeight: "700",
                marginBottom: 8,
                marginTop: 20,
                marginLeft: 20,
              }}
            >
              DESCRIPTION
            </Text>
            <Text
              style={{
                marginBottom: 20,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              {description}
            </Text>
            <Divider
              width={1.5}
              style={{
                marginLeft: 15,
                marginRight: 15,
                opacity: 0.3,
              }}
            />
            <View
              style={{
                padding: 10,
                backgroundColor: "#F2F4F7",
                margin: 20,
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: 200,
                }}
                source={{ uri: `${photoDisplayURL}` }}
              />
            </View>
            <View
              style={{ padding: 15, backgroundColor: "#F2F4F7", margin: 20 }}
            >
              <Text
                style={{
                  color: "#101828",
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 10,
                  alignSelf: "center",
                }}
              >
                Your Contact Info
              </Text>
              <Divider
                width={1.5}
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                }}
              />
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "#101828",
                      fontSize: 12,
                      fontWeight: "700",
                      marginTop: 20,
                      marginLeft: 20,
                    }}
                  >
                    E-MAIL
                  </Text>
                  <Text style={{ marginTop: 20, marginRight: 20 }}>
                    {user.username}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#101828",
                      fontSize: 12,
                      fontWeight: "700",
                      marginTop: 20,
                      marginLeft: 20,
                    }}
                  >
                    PHONE
                  </Text>
                  <Text style={{ marginTop: 20, marginRight: 20 }}>
                    {user.tenant.phone}
                  </Text>
                </View>
              </View>
            </View>
          </>
        </View>
      </BottomSheet>

      <BottomSheet
        onBackdropPress={() => {
          setError("");
          setProblemDepartment("");
        }}
        isVisible={error === "Problem creation success"}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingBottom: 30,
          }}
        >
          <Text
            style={{
              margin: 20,
              color: "#101828",
              fontSize: 18,
              fontWeight: "600",
              alignSelf: "center",
            }}
          >
            Thank you for you inquiry!
          </Text>
          <Divider />
          <Image
            style={{
              width: 70,
              height: 70,
              marginTop: 70,
              marginLeft: 70,
              marginRight: 70,
              marginBottom: 10,
              alignSelf: "center",
            }}
            source={require("../../assets/confirm.png")}
          ></Image>
          <Text
            h3
            style={{ color: "#101828", fontWeight: "700", alignSelf: "center" }}
          >
            Case Opened
          </Text>
          <View
            style={{
              backgroundColor: "#F2F4F7",
              marginLeft: 25,
              marginRight: 25,
              marginTop: 35,
              marginBottom: 70,
              padding: 15,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              You will be contacted via your e-mail {user.username} or on your
              phone number {user.tenant.phone} to set up the time and date for
              the reparation.
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#101828",
              marginLeft: 25,
              marginRight: 25,
              padding: 15,
              marginBottom: 40,
              borderRadius: 5,
            }}
            onPress={() => {
              setError("");
              setProblemDepartment("");
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 16,
                alignSelf: "center",
              }}
            >
              Back to Categories
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
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
