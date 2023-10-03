import { StyleSheet, TouchableOpacity } from "react-native";
import { string, shape, func } from "prop-types";
// @expo/vector-icons一覧サイト https://icons.expo.fyi/Index
// import { Feather } from "@expo/vector-icons";
import Icon from "./icon";

export default function CircleBotton(props) {
    const { style, name, onPress } = props;
    return (
        <TouchableOpacity style={[styles.circleBotton, style]} onPress={onPress}>
            {/* vector-iconsからアイコンを引っ張る場合はコチラ */}
            {/* <Feather name={name} size={32} color="white" /> */}
            <Icon name={name} size={40} color="#FFF" />
        </TouchableOpacity>
    );
}

CircleBotton.propTypes = {
    style: shape(),
    name: string.isRequired,
    onPress: func,
};

CircleBotton.defaultProps = {
    style: null,
    onPress: null,
};

const styles = StyleSheet.create({
    circleBotton: {
        backgroundColor: "#467FD3",
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 40,
        bottom: 40,
        // シャドウ系のプロパティはIOSのみ対応
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        // elevationはAndroidのみ対応
        elevation: 8,
    },
    circleBottonLabel: {
        color: "#fff",
        fontSize: 40,
        lineHeight: 40,
    },
});
