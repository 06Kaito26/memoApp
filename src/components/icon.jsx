import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { string, number, oneOf } from "prop-types";

import icomoon from "../../assets/fonts/icomoon.ttf";
import selection from "../../assets/fonts/selection.json";

export default function Icon(props) {
    const [fontLoaded] = useFonts({ icomoon });
    const { name, size, color } = props;
    const CustomIcon = createIconSetFromIcoMoon(selection);

    if (!fontLoaded) {
        return null;
    }

    // Androidにてアイコン位置がずれるが'style={{ lineHeight: size - 1 }}'を入れると何故か直る…
    return <CustomIcon name={name} size={size} color={color} style={{ lineHeight: size - 1 }} />;
}

Icon.propTypes = {
    name: oneOf(["plus", "delete", "pencil", "check"]).isRequired,
    size: number,
    color: string,
};

Icon.defaultProps = {
    size: 24,
    color: "#000",
};
