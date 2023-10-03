import { StyleSheet, TextInput, View, KeyboardAvoidingView } from "react-native";
import CircleBotton from "../components/CircleBotton";

export default function MemoCreateScreen(props) {
    const { navigation } = props;
    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <View style={styles.inputContainer}>
                <TextInput value="" multiline style={styles.input} />
            </View>
            <CircleBotton
                name="check"
                onPress={() => {
                    navigation.goBack();
                }}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        paddingHorizontal: 27,
        paddingVertical: 32,
        flex: 1,
    },
    input: {
        flex: 1,
        // Androidではデフォルトでテキストがセンターになるのでそれを阻止
        textAlignVertical: "top",
        fontSize: 16,
        lineHeight: 24,
    },
});