import { View, StyleSheet } from "react-native";

import AppBar from "../components/appBar";
import MemoList from "../components/MemoList";
import CircleBotton from "../components/CircleBotton";

export default function MemoListScreen() {
    return (
        <View style={styles.container}>
            <AppBar />
            <MemoList />
            <CircleBotton>+</CircleBotton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
});
