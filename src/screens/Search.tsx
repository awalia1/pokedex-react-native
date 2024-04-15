import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemon, Pokemon } from "../utils/api";
import { MainStackScreenProps } from "../navigation/types";
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
    TextInput,
} from "react-native";

export const Search = ({ navigation }: MainStackScreenProps<"Search">) => {
    const [text, setText] = useState("");
    const { data, fetchStatus, error } = useQuery<Pokemon>(
        ["pokemon", text],
        () => fetchPokemon(text.toLowerCase()),
        {
            enabled: !!text,
        }
    );

    useEffect(() => {
        if (data) {
            navigation.replace("Detail", {
                name: data.name,
            });
        }
    }, [data]);

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Search Pokémon by name or number"
                clearButtonMode="always"
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                onSubmitEditing={({ nativeEvent }) => setText(nativeEvent.text)}
            />
            {!!error && <Text>No results found for {text}</Text>}
            {fetchStatus === "fetching" && <ActivityIndicator />}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "95%",
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});
