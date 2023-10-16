import {
    Alert, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from "react-native";
import { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    // GoogleAuthProvider,
    // signInWithPopup,
} from "firebase/auth";
import Button from "../components/Button";
import { translateErrors } from "../utils";

export default function SignUpScreen(props) {
    const { navigation } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth();

    const handlePress = () => {
        createUserWithEmailAndPassword(auth, email, password)
            // .then((userCredential) => {
            .then(() => {
                // 登録成功時の処理
                // const { user } = userCredential;
                // console.log("ユーザーが登録されました:", user.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "MemoList" }],
                });
            })
            .catch((error) => {
                // 登録エラー時の処理
                const errorMsg = translateErrors(error.code);
                Alert.alert(errorMsg.title, errorMsg.description);
                // console.log(errorMsg.description, error.code);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    style={styles.input}
                    placeholder="Email Address"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                    }}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <Button label="Submit" onPress={handlePress} />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already registered?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "LogIn" }],
                            });
                        }}
                    >
                        <Text style={styles.footerLink}>Log In.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
    inner: {
        paddingHorizontal: 24,
        paddingVertical: 27,
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "bold",
        marginBottom: 24,
    },
    input: {
        fontSize: 16,
        height: 48,
        borderColor: "#ddd",
        borderWidth: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    footer: {
        flexDirection: "row",
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: "#467fd3",
    },
});
