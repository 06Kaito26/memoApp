import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import MemoListScreen from "./src/screens/MemoListScreen";
import MemoDetaileScreen from "./src/screens/MemoDetaileScreen";
import MemoEditScreen from "./src/screens/MemoEditScreen";
import MemoCreateScreen from "./src/screens/MemoCreateScreen";
import LogInScreen from "./src/screens/LogInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

const Stack = createStackNavigator();

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
