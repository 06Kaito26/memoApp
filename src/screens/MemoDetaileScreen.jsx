// eslint-disable-next-line object-curly-newline
import { View, ScrollView, Text, StyleSheet } from "react-native";

import AppBar from "../components/AppBar";
import CircleBotton from "../components/CircleBotton";

export default function MemoDetaileScreen() {
    return (
        <View style={styles.container}>
            <AppBar />
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle}>買い物リスト</Text>
                <Text style={styles.memoDate}>2023/09/28 11:42</Text>
            </View>
            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoText}>
                    {/* eslint-disable-next-line max-len */}
                    買い物リスト
                    書体やレイアウトなどを確認するために用います。本文用なので使い方を間違えると不自然に見えることもありますので要注意。
                    {/* eslint-disable-next-line max-len */}
                    カタカナ語が苦手な方は「組見本」と呼ぶとよいでしょう。なお、組見本の「組」とは文字組のことです。活字印刷時代の用語だったと思います。このダミーテキストは自由に改変することが出来ます。主に書籍やウェブページなどのデザインを作成する時によく使われます。書体やレイアウトなどを確認するために用います。
                    {/* eslint-disable-next-line max-len */}
                    ダミーテキストはダミー文書やダミー文章とも呼ばれることがあります。カタカナ語が苦手な方は「組見本」と呼ぶとよいでしょう。主に書籍やウェブページなどのデザインを作成する時によく使われます。これは正式な文章の代わりに入れて使うダミーテキストです。
                </Text>
            </ScrollView>
            <CircleBotton style={{ top: 160, bottom: "auto" }} name="pencil" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    memoHeader: {
        backgroundColor: "#467FD3",
        height: 96,
        justifyContent: "center",
        paddingVertical: 24,
        paddingHorizontal: 19,
    },
    memoTitle: {
        color: "#fff",
        fontSize: 20,
        lineHeight: 32,
        fontWeight: "bold",
    },
    memoDate: {
        color: "#fff",
        fontSize: 12,
        lineHeight: 16,
    },
    memoBody: {
        paddingVertical: 32,
        paddingHorizontal: 27,
    },
    memoText: {
        fontSize: 16,
        lineHeight: 24,
    },
});
