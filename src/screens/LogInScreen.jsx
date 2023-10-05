import {
    StyleSheet, Text, TextInput, TouchableOpacity, View,
} from "react-native";
import { useState } from "react";
import Button from "../components/Button";

export default function LogInScreen(props) {
    const { navigation } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Log In</Text>
                <TextInput
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Email Address"
                    textContentType="emailAddress"
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
                <Button
                    label="Submit"
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "MemoList" }],
                        });
                    }}
                />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "SignUp" }],
                            });
                        }}
                    >
                        <Text style={styles.footerLink}>Sing up here!</Text>
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
