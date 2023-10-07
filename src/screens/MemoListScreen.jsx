import { View, StyleSheet } from "react-native";
import { useEffect } from "react";

import MemoList from "../components/MemoList";
import CircleBotton from "../components/CircleBotton";
import LogOutButton from "../components/LogOutButton";

export default function MemoListScreen(props) {
    const { navigation } = props;
    useEffect(() => {
        navigation.setOptions({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <LogOutButton />,
        });
    }, []);

    return (
        <View style={styles.container}>
            <MemoList />
            <CircleBotton
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
