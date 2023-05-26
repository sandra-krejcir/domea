import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native-gesture-handler";

export function Picture(props) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [photoToDisplay, setPhotoToDisplay] = useState("");

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  /* const uploadImage = async (newPhoto) => {
    const fileToUpload = newPhoto.base64;
    const data = {};
    data.photo = fileToUpload;
    try {
      // get ip on mac: ipconfig getifaddr en0
      console.log("fetch", data);
      let res = await fetch(
        "https://3f14-5-179-80-205.eu.ngrok.io/problems/image",
        {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let responseJson = await res.json();
      console.log(responseJson);
    } catch (error) {
      // console.log("error", error)
    }
  }; */

  let takePic = async () => {
    let options = {
      quality: 0.1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhotoToDisplay(newPhoto);
    setPhoto(newPhoto);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    const { base64, ...rest } = photoToDisplay;
    formData.append("source", base64);
    formData.append("action", "upload");
    formData.append("format", "json");

    try {
      let res = await fetch(
        `https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5`,
        {
          method: "POST",
          body: formData,
        }
      );
      /* console.log("the response", res); */
      let responseJson = await res.json();
      console.log("json response", responseJson);
      props
        .setPhotoDisplayURL(responseJson.image.display_url)
        .then(() => console.log("done"));
    } catch (error) {
      // console.log("error", error)
    }
  };

  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri);
      uploadImage().then(() => {
        setPhoto(undefined);
        props.setCamera(false);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.buttonContainer, { bottom: 400 }]}>
          <TouchableOpacity
            style={{
              backgroundColor: "#F2F4F7",
              color: "#1A1B22",
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 5,
            }}
            onPress={() => setPhoto(undefined)}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Discard</Text>
          </TouchableOpacity>

          {hasMediaLibraryPermission ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#A5ED7B",
                color: "#1A1B22",
                padding: 10,
                borderRadius: 5,
              }}
              onPress={() => savePhoto()}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Save</Text>
            </TouchableOpacity>
          ) : undefined}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={[styles.buttonContainer, { bottom: 10 }]}>
        <TouchableOpacity
          style={{
            backgroundColor: "#F2F4F7",
            color: "#1A1B22",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 5,
          }}
          onPress={() => props.setCamera(false)}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#A5ED7B",
            color: "#1A1B22",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => takePic()}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Take Pic</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#101828",
  },
  buttonContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    gap: 50,
    alignSelf: "center",
    margin: 15,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
