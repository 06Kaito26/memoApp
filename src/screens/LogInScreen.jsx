import {
    Alert, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from "react-native";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { translateErrors } from "../utils";

export default function LogInScreen(props) {
    const { navigation } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // ユーザがログイン済みの場合"MemoList"へ遷移
            if (user) {
                // console.log("ログインユーザー : ", auth.currentUser.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "MemoList" }],
                });
            } else {
                setLoading(false);
            }
        });

        // useEffect内で監視解除関数を返す
        return unsubscribe;
    }, []); // 空の配列を指定して初回のみ実行されるように

    const handlePress = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            // .then((userCredential) => {
            .then(() => {
                // ログイン成功時の処理
                // const { user } = userCredential;
                // console.log("ログインに成功しました：", user.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "MemoList" }],
                });
            })
            .catch((error) => {
                // ログイン失敗時の処理
                const errorMsg = translateErrors(error.code);
                Alert.alert(errorMsg.title, errorMsg.description);
                // console.log(errorMsg.description, error.code);
            })
            .then(() => {
                setLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <Loading isLoading={isLoading} />
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
                <Button label="Submit" onPress={handlePress} />
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
