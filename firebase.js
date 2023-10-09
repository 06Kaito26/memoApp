import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "./env";

// Firebase Appの初期化
const app = initializeApp(firebaseConfig);

// Firebase Authの初期化
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

// Firebase Authの初期化状態を確認し、成功したらログにメッセージを表示
if (auth) {
    console.log("Firebaseの初期化に成功しました");
} else {
    console.error("Firebaseの初期化に失敗しました");
}

export { db, auth };
