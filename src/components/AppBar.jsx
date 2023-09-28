import { Text, View, StyleSheet } from "react-native";

export default function AppBar() {
    return (
        <View style={styles.appBar}>
            <View style={styles.appBarInner}>
                <Text style={styles.appBarTitle}>memoApp</Text>
                <Text style={styles.appBarRight}>logout</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appBar: {
        width: "100%",
        height: 104,
        backgroundColor: "#467FD3",
        justifyContent: "flex-end",
    },
    appBarInner: {
        alignItems: "center",
    },
    appBarRight: {
        position: "absolute",
        right: 19,
        bottom: 12,
        color: "rgba(255,255,255,0.8)",
    },
    appBarTitle: {
        marginBottom: 8,
        fontSize: 22,
        lineHeight: 32,
        color: "#fff",
        fontWeight: "bold",
    },
});

