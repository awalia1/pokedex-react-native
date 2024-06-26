import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Details } from "../screens/Details";
import { Home } from "../screens/Home";
import { Search } from "../screens/Search";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import type { MainStackParamList } from "./types";

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={({ navigation }) => ({
                    headerLargeTitle: true,
                    headerTitle: "Pokédex",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Search")}
                        >
                            <MaterialIcons
                                name="search"
                                color="black"
                                size={32}
                            />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Detail"
                component={Details}
                options={({ route }) => ({
                    title: route.params.name,
                })}
            />
            <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
    );
};
