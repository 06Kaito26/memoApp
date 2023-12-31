import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import {
    Text, StyleSheet, TouchableOpacity, Alert,
} from "react-native";

export default function LogOutButton() {
    const navigation = useNavigation();
    const auth = getAuth();

    const handlePress = () => {
        signOut(auth)
            .then(() => {
                // console.log("ログアウトに成功しました");
                navigation.reset({
                    index: 0,
                    routes: [{ name: "LogIn" }],
                });
            })
            .catch(() => {
                Alert.alert("ログアウトに失敗しました");
            });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text style={styles.label}>logout</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    label: {
        fontSize: 14,
        color: "rgba(255,255,255,0.7)",
    },
});
