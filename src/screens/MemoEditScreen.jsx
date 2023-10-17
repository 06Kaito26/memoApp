import { useState } from "react";
import {
    StyleSheet, TextInput, View, Alert,
} from "react-native";
import { shape, string } from "prop-types";
import { doc, setDoc } from "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CircleButton from "../components/CircleButton";
import { auth, db } from "../../firebase";
import { translateErrors } from "../utils";

export default function MemoEditScreen(props) {
    const { navigation, route } = props;
    const { id, bodyText } = route.params;
    const [body, setBody] = useState(bodyText);

    const handlePress = () => {
        if (!auth.currentUser) {
            // ユーザーが認証されていない際のエラーハンドリング
            Alert.alert("Authentication Error", "User is not authenticated.");
            return;
        }
        const docRef = doc(db, `users/${auth.currentUser.uid}/memos`, id);
        setDoc(
            docRef,
            {
                bodyText: body,
                updatedAt: new Date(),
            },
            { merge: true }, // マージオプションを指定
        )
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                const errorMsg = translateErrors(error.code);
                Alert.alert(errorMsg.title, errorMsg.description);
                // console.log(errorMsg.description, error.code);
            });
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={body}
                    multiline
                    style={styles.input}
                    onChangeText={(text) => {
                        setBody(text);
                    }}
                />
            </View>
            <CircleButton name="check" onPress={handlePress} />
        </KeyboardAwareScrollView>
    );
}

MemoEditScreen.propTypes = {
    route: shape({
        params: shape({ id: string, bodyText: string }),
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        flex: 1,
    },
    input: {
        flex: 1,
        // Androidではデフォルトでテキストがセンターになるのでそれを阻止
        textAlignVertical: "top",
        fontSize: 16,
        lineHeight: 24,
        paddingTop: 32,
        paddingBottom: 130,
        paddingHorizontal: 27,
    },
});
