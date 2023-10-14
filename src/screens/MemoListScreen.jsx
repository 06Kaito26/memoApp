import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import {
    collection, onSnapshot, orderBy, query,
} from "firebase/firestore";

import MemoList from "../components/MemoList";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";
import { db, auth } from "../../firebase";
import Button from "../components/Button";

export default function MemoListScreen(props) {
    const { navigation } = props;
    const [memos, setMemos] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <LogOutButton />,
        });
    }, []);

    useEffect(() => {
        if (!auth.currentUser) {
            return;
        }
        // console.log("メモリスト参照先 : ", `users/${auth.currentUser.uid}/memos`);
        const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
        const q = query(ref, orderBy("updatedAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const remoteMemos = [];
            snapshot.forEach((doc) => {
                // console.log("メモリスト :", doc.data());
                const { bodyText, updatedAt } = doc.data();
                remoteMemos.push({
                    id: doc.id,
                    bodyText,
                    updatedAt: updatedAt.toDate(),
                });
            });
            setMemos(remoteMemos);
        });
        // クリーンアップ関数を返す
        // eslint-disable-next-line consistent-return
        return () => {
            unsubscribe();
        };
    }, []);

    // メモ件数が0件の場合の処理
    if (!memos.length) {
        return (
            <View style={emptyStyles.container}>
                <View style={emptyStyles.inner}>
                    <Text style={emptyStyles.title}>Let&apos;s create your first memo!</Text>
                    <Button
                        style={emptyStyles.button}
                        label="Create!"
                        onPress={() => navigation.navigate("MemoCreate")}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MemoList memos={memos} />
            <CircleButton
                name="plus"
                onPress={() => {
                    navigation.navigate("MemoCreate");
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
});

const emptyStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inner: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        marginBottom: 24,
    },
    button: {
        alignSelf: "center",
    },
});
