import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { Problems } from "./components/problems/problemForm";
import { Login } from "./components/users/login";
/* import { Signup } from "./features/users/signup"; */
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FrontpageTenant } from "./components/tenants/frontpage";
import { FrontpageAdmin } from "./components/admins/frontpage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <View style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              options={{ headerShown: false }}
              name="FrontpageAdmin"
              component={FrontpageAdmin}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="FrontpageTenant"
              component={FrontpageTenant}
            />
          </Stack.Navigator>
        </View>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
});
