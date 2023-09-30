import { Feather } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";

export default function MemoList() {
    return (
        <View>
            {/* memoListItems */}
            <View style={styles.memoListItems}>
                <View>
                    <Text style={styles.memoListTitle}>買い物リスト</Text>
                    <Text style={styles.memoListItemDate}>2023/09/28 9:40</Text>
                </View>
                {/* deleteButton */}
                <View>
                    <View>
                        <Feather name="x" size={16} color="#B0B0B0" />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    memoListTitle: {
        fontSize: 16,
        lineHeight: 32,
    },
    memoListItemDate: {
        fontSize: 12,
        lineHeight: 16,
        color: "#848484",
    },
});
