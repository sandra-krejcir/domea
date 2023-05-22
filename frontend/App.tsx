import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { ProblemsForm } from "./components/problems/problemForm";
import { Login } from "./components/users/login";
/* import { Signup } from "./features/users/signup"; */
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FrontpageTenant } from "./components/tenants/frontpage";
import { FrontpageAdmin } from "./components/admins/frontpage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SecureStore from "expo-secure-store";
import { Categories } from "./components/problems/problemKategories";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Stack = createNativeStackNavigator();

const LeftDrawer = createDrawerNavigator();

const queryClient = new QueryClient();

const LeftDrawerScreenAdmin = () => {
  return (
    <LeftDrawer.Navigator
      screenOptions={{ drawerPosition: "left", drawerType: "front" }}
    >
      <LeftDrawer.Screen name="Home" component={FrontpageAdmin} />
    </LeftDrawer.Navigator>
  );
};

const LeftDrawerScreenTenant = () => {
  return (
    <LeftDrawer.Navigator
      screenOptions={{ drawerPosition: "left", drawerType: "front" }}
    >
      <LeftDrawer.Screen name="Home" component={FrontpageTenant} />
      <LeftDrawer.Screen name="Resident Service" component={ProblemsForm} />
      <LeftDrawer.Screen name="Categories" component={Categories} />
    </LeftDrawer.Navigator>
  );
};

export default function App() {
  SecureStore.setItemAsync("role", "");
  SecureStore.setItemAsync("token", "");
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <View style={styles.container}>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen
                options={{ headerShown: false }}
                name="FrontpageAdmin"
                component={LeftDrawerScreenAdmin}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="FrontpageTenant"
                component={LeftDrawerScreenTenant}
              />
            </Stack.Navigator>
          </View>
        </Provider>
      </QueryClientProvider>
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
