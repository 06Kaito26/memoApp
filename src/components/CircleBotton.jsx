import { View, StyleSheet } from "react-native";
import { string, shape } from "prop-types";
import { Feather } from '@expo/vector-icons';


export default function CircleBotton(props) {
    const {style} = props;
    return (
        <View style={[styles.circleBotton, style]}>
            <Feather name="plus" size={24} color="white" />
        </View>
    );
}

CircleBotton.propTypes = {
    children: string.isRequired,
    style: shape(),
};

CircleBotton.defaultProps = {
    style: null,
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
