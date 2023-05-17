import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { Problems } from "./components/problems/problemForm";
import { Login } from "./components/users/login";
/* import { Signup } from "./features/users/signup"; */
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Login></Login>
        {/* <Signup></Signup> */}
        {/* <Problems></Problems> */}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
});
