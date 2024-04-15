import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchFn, fetchPokemon, Pokemon } from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import { MainStackScreenProps } from "../navigation/types";
import { formatNumber, getTypeColor, typesColors } from "../utils/helper";

export interface PokemonCardProps {
    name: string;
    url: string;
}

export const PokemonCard = ({ name, url }: PokemonCardProps) => {
    const { isLoading, error, data } = useQuery<Pokemon>(
        ["pokemon", name],
        () => fetchPokemon(name)
    );

    const backgroundColor = data
        ? getTypeColor(data.types[0].type.name)
        : "#A8A77A";

    const navigation =
        useNavigation<MainStackScreenProps<"Home">["navigation"]>();

    if (isLoading) return <ActivityIndicator />;
    if (!data || error) return null;

    const styles = StyleSheet.create({
        container: {
            padding: 8,
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: `${backgroundColor}`,
            margin: 8,
            borderRadius: 10,
        },
        image: {
            width: 120,
            height: 140,
            margin: 10,
        },
        name: {
            fontWeight: "bold",
            fontSize: 24,
            textTransform: "capitalize",
        },
        id: {
            fontSize: 18,
            paddingBottom: 8,
            paddingTop: 4,
        },
    });

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Detail", { name })}
            style={{ width: "50%" }}
            activeOpacity={0.5}
        >
            <View style={styles.container}>
                <Image
                    source={{
                        uri: data.sprites.other["official-artwork"]
                            .front_default,
                    }}
                    style={styles.image}
                />
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.id}>{formatNumber(data.id)}</Text>
            </View>
        </TouchableOpacity>
    );
};
