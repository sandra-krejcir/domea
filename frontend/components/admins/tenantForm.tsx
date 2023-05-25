import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { View, Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, BottomSheet } from "@rneui/themed";
import { TextInput } from "react-native-paper";
import { TenantEntity } from "./tenantEntity";
import { createTenant } from "../../components/users/usersSlice";
import { TouchableOpacity } from "react-native-gesture-handler";

export function TenantFormAdmin() {
	const dispatch = useDispatch<AppDispatch>();
	const feedback = useSelector((state: RootState) => state.users.error);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [phone, setPhone] = useState("");
	const [isVisible, setIsVisible] = useState(false);

	const handleSubmit = () => {
		dispatch(
			createTenant(
				new TenantEntity(username, password, firstname, lastname, phone)
			)
		);
		setIsVisible(true);
	};

	const closeFeedback = () => {
		setUsername("");
		setPassword("");
		setFirstname("");
		setLastname("");
		setPhone("");
		setIsVisible(false);
	}

	useEffect(() => {
		// console.log("here", photoDisplayURL);
	}, []);

	return (
		<KeyboardAwareScrollView
			style={{ backgroundColor: "white" }}
			resetScrollToCoords={{ x: 0, y: 0 }}
			contentContainerStyle={styles.container}
			scrollEnabled={false}
		>
			<Image
				style={styles.image}
				source={require("../../assets/green-gradient.png")}
			/>
			<Text h1 h1Style={styles.h1}>
				Create tenant
			</Text>
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
				<TextInput
					onChangeText={setPhone}
					value={phone}
					label="Phone nr. *"
					mode="outlined"
					outlineColor="#D0D5DD"
					outlineStyle={{ borderWidth: 2 }}
					activeOutlineColor="#A5ED7B"
					selectionColor="black"
					textColor="black"
					style={styles.input}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => handleSubmit()}
				>
					<Text style={styles.buttontext}>{"Create tenant"}</Text>
				</TouchableOpacity>
			</View>

			<BottomSheet
				onBackdropPress={() => {
					setIsVisible(false);
				}}
				isVisible={isVisible}
			>
				<View
					style={styles.bottomsheet}
				>
					<Text style={styles.feedbacktext}>{feedback}</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => closeFeedback()}
					>
						<Text style={styles.buttontext}>{"Close"}</Text>
					</TouchableOpacity>
				</View>
			</BottomSheet>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		height: "100%",
		flex: 1,
		padding: 20,
	},
	image: {
		position: "absolute",
		right: 0,
		bottom: 0,
	},
	h1: {
		color: "#101828",
		fontSize: 24,
		lineHeight: 32,
		fontWeight: "600",
		paddingTop: 20,
		paddingBottom: 32,
	},
	form: {
		gap: 20,
	},
	input: {
		backgroundColor: "white",
		color: "black",
	},
	button: {
		backgroundColor: "#101828",
		marginTop: 22,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
	},
	buttontext: {
		color: "white",
		fontSize: 14,
		lineHeight: 26,
		fontWeight: "700",
		textTransform: "uppercase",
	},
	bottomsheet: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		paddingBottom: 80,
	},
	feedbacktext: {
		textAlign: "center",
		fontSize: 20,
		lineHeight: 32,
		fontWeight: "600",
	}
});
