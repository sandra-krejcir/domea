import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { View, Image, StyleSheet } from "react-native";
import { Text } from '@rneui/themed';
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

  const handleSubmit = () => {

    dispatch(
      createTenant(
        new TenantEntity(
          username,
		  password,
          firstname,
		  lastname
        )
      )
    );
  };

  useEffect(() => {
    // console.log("here", photoDisplayURL);
  }, []);

  return (
    <View style={styles.container}>
	<Image
	style={styles.image}
	source={require('../../assets/green-gradient.png')}
  />
  <Text h1 h1Style={styles.h1}>Create tenant</Text>
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
		<TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
      		<Text style={styles.buttontext}>{"Create tenant"}</Text>
    	</TouchableOpacity>
	  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
	backgroundColor: 'white',
	height: '100%',
    flex: 1,
	paddingTop: 95,
    paddingHorizontal: 20,
  },
  image: {
    position: 'absolute',
	right: 0,
	bottom: 0,
  },
  h1: {
	color: '#101828',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    marginBottom: 32,
  },
  form: {
    flex: 1,
	gap: 20,
  },
  input: {
	backgroundColor: "white",
	color: "black",
  },
  button: {
	backgroundColor: '#101828',
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  buttontext: {
	color: 'white',
    fontSize: 14,
    lineHeight: 26,
    fontWeight: '700',
	textTransform: 'uppercase',
  },
});
