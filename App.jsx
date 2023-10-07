import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import MemoListScreen from "./src/screens/MemoListScreen";
import MemoDetaileScreen from "./src/screens/MemoDetaileScreen";
import MemoEditScreen from "./src/screens/MemoEditScreen";
import MemoCreateScreen from "./src/screens/MemoCreateScreen";
import LogInScreen from "./src/screens/LogInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ENV from "./env.json";

const Stack = createStackNavigator();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: ENV.REACT_APP_FIREBASE_API_KEY,
    authDomain: ENV.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: ENV.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: ENV.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: ENV.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: ENV.REACT_APP_FIREBASE_APP_ID,
    measurementId: ENV.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// export const database = getFirestore(app);
// export const storage = getStorage(app);

export default function App() {
    return (
        // ナビゲーション実装 https://reactnavigation.org/docs/5.x/hello-react-navigation#creating-a-stack-navigator
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="SignUp"
                screenOptions={{
                    headerStyle: { backgroundColor: "#467fd3" },
                    headerTitleStyle: { color: "#fff" },
                    headerTitle: "memoApp",
                    headerTintColor: "#fff",
                    headerBackTitle: "Back",
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    gestureEnabled: true,
                    gestureDirection: "horizontal",
                }}
            >
                <Stack.Screen name="MemoList" component={MemoListScreen} />
                <Stack.Screen name="MemoDetail" component={MemoDetaileScreen} />
                <Stack.Screen name="MemoEdit" component={MemoEditScreen} />
                <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
                <Stack.Screen
                    name="LogIn"
                    component={LogInScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                    }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
