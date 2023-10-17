// import { Feather } from "@expo/vector-icons";
import {
    Text, View, StyleSheet, TouchableOpacity, Alert, FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
    shape, string, instanceOf, arrayOf,
} from "prop-types";
import { collection, deleteDoc, doc } from "firebase/firestore";
import Icon from "./icon";
import { dateToString } from "../utils";
import { auth, db } from "../../firebase";

export default function MemoList(props) {
    const { memos } = props;
    const navigation = useNavigation();

    const deleteMemo = (id) => {
        if (auth) {
            const ref = doc(collection(db, `users/${auth.currentUser.uid}/memos`), id);
            Alert.alert(
                "選択したメモを削除しますか？",
                "[削除]を選択すると該当のメモが削除されます",
                [
                    {
                        text: "キャンセル",
                        onPress: () => {},
                    },
                    {
                        text: "削除",
                        // スタイルはiOSのみ適用可能
                        style: "destructive",
                        onPress: () => {
                            deleteDoc(ref).catch(() => {
                                Alert.alert("削除に失敗しました");
                            });
                        },
                    },
                ],
            );
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.memoListItems}
            onPress={() => {
                navigation.navigate("MemoDetail", { id: item.id });
            }}
        >
            <View style={styles.memoInner}>
                <Text style={styles.memoListTitle} numberOfLines={1}>
                    {item.bodyText}
                </Text>
                <Text style={styles.memoListItemDate}>{dateToString(item.updatedAt)}</Text>
            </View>
            {/* deleteButton */}
            <View>
                <TouchableOpacity
                    style={styles.memoDelete}
                    onPress={() => {
                        deleteMemo(item.id);
                    }}
                >
                    {/* vector-iconsからアイコンを引っ張る場合はコチラ */}
                    {/* <Feather name="x" size={16} color="#B0B0B0" /> */}
                    <Icon name="delete" size={24} color="#B0B0B0" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* memoListItems */}
            <FlatList data={memos} renderItem={renderItem} keyExtractor={(item) => item.id} />
        </View>
    );
}

MemoList.propTypes = {
    memos: arrayOf(
        shape({
            id: string,
            bodyText: string,
            updatedAt: instanceOf(Date),
        }),
    ).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    memoListItems: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 19,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.15)",
    },
    memoListInner: {
        flex: 1,
    },
    memoListTitle: {
        fontSize: 16,
        lineHeight: 32,
    },
    memoListItemDate: {
        fontSize: 12,
        lineHeight: 16,
        color: "#848484",
    },
    memoDelete: {
        padding: 8,
    },
});
