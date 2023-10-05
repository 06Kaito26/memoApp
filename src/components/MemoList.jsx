// import { Feather } from "@expo/vector-icons";
import {
    Text, View, StyleSheet, TouchableOpacity, Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "./icon";

export default function MemoList() {
    const navigation = useNavigation();
    return (
        <View>
            {/* memoListItems */}
            <TouchableOpacity
                style={styles.memoListItems}
                onPress={() => {
                    navigation.navigate("MemoDetail");
                }}
            >
                <View>
                    <Text style={styles.memoListTitle}>買い物リスト</Text>
                    <Text style={styles.memoListItemDate}>2023/09/28 9:40</Text>
                </View>
                {/* deleteButton */}
                <View>
                    <TouchableOpacity
                        style={styles.memoDelete}
                        onPress={() => {
                            Alert.alert("TEST");
                        }}
                    >
                        {/* vector-iconsからアイコンを引っ張る場合はコチラ */}
                        {/* <Feather name="x" size={16} color="#B0B0B0" /> */}
                        <Icon name="delete" size={24} color="#B0B0B0" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
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
    memoDelete: {
        padding: 8,
    },
});
