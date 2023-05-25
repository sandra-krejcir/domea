import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { Provider } from "react-redux";
import { ProblemsForm } from "./components/problems/problemForm";
import { Login } from "./components/users/login";
/* import { Signup } from "./features/users/signup"; */
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FrontpageTenant } from "./components/tenants/frontpage";
import { FrontpageAdmin } from "./components/admins/frontpage";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Categories } from "./components/problems/problemCategories";
import { ResidentService } from "./components/problems/residentService";
import { Text } from "@rneui/themed";
import { TenantFormAdmin } from "./components/admins/tenantForm";

const Stack = createNativeStackNavigator();

const LeftDrawer = createDrawerNavigator();

const queryClient = new QueryClient();
const CustomHeader = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginLeft: 15 }}
          source={require("./assets/boligfy_icon.png")}
        />
        <Text h4 style={{ fontWeight: "700" }}>
          Boligfy
        </Text>
      </View>
	  <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const LeftDrawerScreenAdmin = () => {
  return (
    <LeftDrawer.Navigator
      screenOptions={{ drawerPosition: "left", drawerType: "front" }}
      drawerContent={(props) => <CustomHeader {...props} />}
    >
      <LeftDrawer.Screen name="Home" component={FrontpageAdmin} options={{ headerTitle: () => <LogoTitle /> }}/>
      <LeftDrawer.Screen name="Create tenant" component={TenantFormAdmin} options={{ headerTitle: () => <LogoTitle /> }}/>
    </LeftDrawer.Navigator>
  );
};

const LeftDrawerScreenTenant = () => {
  return (
    <LeftDrawer.Navigator
      screenOptions={{ drawerPosition: "left", drawerType: "front" }}
      drawerContent={(props) => <CustomHeader {...props} />}
    >
      <LeftDrawer.Screen
        name="Home"
        component={FrontpageTenant}
        options={{ headerTitle: () => <LogoTitle /> }}
      />
      <LeftDrawer.Screen name="Resident Service" component={ResidentService} />
    </LeftDrawer.Navigator>
  );
};

const LogoTitle = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Image
        style={{ width: 30, height: 30, marginRight: 10 }}
        source={require("./assets/boligfy_icon.png")}
      />
      <Text h4 style={{ fontWeight: "700" }}>
        Boligfy
      </Text>
    </View>
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
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerTitle: () => <LogoTitle /> }}
            />
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
    backgroundColor: "white",
  },
});
