import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {
    collection, onSnapshot, orderBy, query,
} from "firebase/firestore";

import MemoList from "../components/MemoList";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";
import { db, auth } from "../../firebase";

export default function MemoListScreen(props) {
    const [memos, setMemos] = useState([]);
    const { navigation } = props;

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
