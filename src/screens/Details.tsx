import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { MainStackScreenProps } from "../navigation/types";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFn, fetchPokemon, Pokemon, Species } from "../utils/api";
import {
    formatNumber,
    getTypeColor,
    removeEscapeCharacters,
} from "../utils/helper";

export const Details = ({
    navigation,
    route,
}: MainStackScreenProps<"Detail">) => {
    const { name } = route.params;
    const { data } = useQuery<Pokemon>(["pokemon", name], () =>
        fetchPokemon(name)
    );
    const [selectedId, setSelectedId] = useState<string>("pd1");

    const { isLoading: isSpeciesLoading, data: species } = useQuery<Species>(
        ["species", name],
        () => fetchFn(data?.species.url || ""),
        {
            enabled: !!data,
        }
    );

    type ListItemData = {
        id: string;
        title: string;
    };

    const textSections: ListItemData[] = [
        {
            id: "pd1",
            title: "Details",
        },
        {
            id: "pd2",
            title: "HP",
        },
        {
            id: "pd3",
            title: "Height",
        },
        {
            id: "pd4",
            title: "Weight",
        },
        {
            id: "pd5",
            title: "Habitat",
        },
        {
            id: "pd6",
            title: "Move(s)",
        },
    ];

    type TextSectionsProps = {
        item: ListItemData;
        onPress: () => void;
        backgroundColor: string;
        textColor: string;
    };

    const Item = ({
        item,
        onPress,
        backgroundColor,
        textColor,
    }: TextSectionsProps) => (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.item, { backgroundColor }]}
        >
            <Text style={[styles.title, { color: textColor }]}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    if (!data) return null;

    useEffect(() => {
        navigation.setParams({ name });
    }, []);

    const renderItem = ({ item }: { item: ListItemData }) => {
        const backgroundColor = item.id === selectedId ? "black" : "#d3d3d3";
        const color = item.id === selectedId ? "white" : "black";

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    const backgroundColor = data
        ? getTypeColor(data.types[0].type.name)
        : "#A8A77A";

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            alignItems: "center",
            padding: 8,
            margin: 8,
        },
        image: {
            width: 200,
            height: 220,
        },
        name: {
            fontWeight: "bold",
            fontSize: 24,
            textTransform: "capitalize",
        },
        id: {
            fontSize: 18,
            paddingBottom: 18,
            paddingTop: 4,
        },
        item: {
            padding: 12,
            borderRadius: 12,
            marginTop: 8,
            marginRight: 6,
        },
        title: {
            fontSize: 16,
        },
        imgContainer: {
            backgroundColor: `${backgroundColor}`,
            paddingTop: 60,
            paddingBottom: 60,
            paddingRight: 50,
            paddingLeft: 50,
            borderRadius: 15,
        },
        description: {
            fontSize: 18,
            marginTop: 12,
            padding: 8,
            fontStyle: "italic",
        },
        statsText: {
            borderWidth: 5,
            padding: 12,
            margin: 18,
            fontStyle: "italic",
            fontSize: 48,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.id}>{formatNumber(data.id)}</Text>
            <View style={styles.imgContainer}>
                <Image
                    source={{
                        uri: data.sprites.other["official-artwork"]
                            .front_default,
                    }}
                    style={styles.image}
                />
            </View>
            <FlatList
                data={textSections}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
            {species && selectedId === "pd1" && (
                <Text style={styles.description}>
                    {removeEscapeCharacters(
                        species.flavor_text_entries[0].flavor_text
                    )}
                </Text>
            )}
            {species && selectedId === "pd2" && (
                <Text style={styles.statsText}>{species.base_happiness}</Text>
            )}
            {selectedId === "pd3" && (
                <Text style={styles.statsText}>{`${data.height}m`}</Text>
            )}
            {selectedId === "pd4" && (
                <Text style={styles.statsText}>{`${data.weight}lbs`}</Text>
            )}
            {species && selectedId === "pd5" && (
                <Text style={styles.statsText}>{species.habitat.name}</Text>
            )}
            {selectedId === "pd6" && (
                <Text style={styles.statsText}>{data.moves[0].move.name}</Text>
            )}
        </View>
    );
};
