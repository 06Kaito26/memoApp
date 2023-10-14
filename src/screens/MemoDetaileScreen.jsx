import {
    View, ScrollView, Text, StyleSheet,
} from "react-native";
import { shape, string } from "prop-types";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";

import CircleButton from "../components/CircleButton";
import { auth, db } from "../../firebase";
import { dateToString } from "../utils";

export default function MemoDetaileScreen(props) {
    const { navigation, route } = props;
    const { id } = route.params;
    const [memo, setMemo] = useState(null);

    useEffect(() => {
        if (!auth.currentUser) {
            return;
        }
        const ref = doc(collection(db, `users/${auth.currentUser.uid}/memos`), id);
        console.log("参照先 : ", JSON.stringify(`users/${auth.currentUser.uid}/memos`));
        console.log("ID : ", id);
        const unsubscribe = onSnapshot(ref, (document) => {
            if (document.exists()) {
                const data = document.data();
                setMemo({
                    id: document.id,
                    bodyText: data.bodyText,
                    updatedAt: data.updatedAt.toDate(),
                });
                console.log(document.id, document.data());
            } else {
                console.log("ドキュメントが存在しません");
            }
        });

        // eslint-disable-next-line consistent-return
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle} numberOfLines={1}>
                    {memo && memo.bodyText}
                </Text>
                <Text style={styles.memoDate}>{memo && dateToString(memo.updatedAt)}</Text>
            </View>
            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoText}>{memo && memo.bodyText}</Text>
            </ScrollView>
            <CircleButton
                style={{ top: 60, bottom: "auto" }}
                name="pencil"
                onPress={() => {
                    navigation.navigate("MemoEdit", { id: memo.id, bodyText: memo.bodyText });
                }}
            />
        </View>
    );
}

MemoDetaileScreen.propTypes = {
    route: shape({
        params: shape({ id: string }),
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    memoHeader: {
        backgroundColor: "#467FD3",
        height: 96,
        justifyContent: "center",
        paddingVertical: 24,
        paddingHorizontal: 19,
    },
    memoTitle: {
        color: "#fff",
        fontSize: 20,
        lineHeight: 32,
        fontWeight: "bold",
    },
    memoDate: {
        color: "#fff",
        fontSize: 12,
        lineHeight: 16,
    },
    memoBody: {
        paddingVertical: 32,
        paddingHorizontal: 27,
    },
    memoText: {
        fontSize: 16,
        lineHeight: 24,
    },
});
