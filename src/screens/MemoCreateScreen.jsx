import {
    StyleSheet,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

import CircleBotton from "../components/CircleBotton";
import { auth, db } from "../../firebase"; // authは使わないので削除

export default function MemoCreateScreen(props) {
    const { navigation } = props;
    const user = auth.currentUser; // ログイン中のユーザー情報を取得
    const [bodyText, setBodyText] = useState("");

    const handlePress = () => {
        addDoc(collection(db, `users/${user.uid}/memos`), {
            bodyText,
            updatedAt: new Date(),
        })
            .then((docRef) => {
                console.log("Created!", docRef.id);
                navigation.goBack();
            })
            .catch((error) => {
                console.log("Error!", error);
            });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "height" : null}
        >
            <View style={styles.contentContainer}>
                <TextInput
                    value={bodyText}
                    multiline
                    style={styles.input}
                    onChangeText={(text) => {
                        setBodyText(text);
                    }}
                    autoFocus
                />
            </View>
            <CircleBotton name="check" onPress={handlePress} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1, // コンテンツの高さが画面に合わせて調整される
        paddingHorizontal: 27,
        paddingVertical: 32,
    },
    input: {
        flex: 1,
        // Androidではデフォルトでテキストがセンターになるのでそれを阻止
        textAlignVertical: "top",
        fontSize: 16,
        lineHeight: 24,
    },
});
