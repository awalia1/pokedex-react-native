import { PokemonCardProps, PokemonCard } from "../components/PokemonCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AllPokemon, fetchAllPokemon, Pokemon } from "../utils/api";
import { useCallback } from "react";
import { ActivityIndicator, FlatList } from "react-native";

export function Home() {
    const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery<AllPokemon>(["pokemons"], fetchAllPokemon, {
            getNextPageParam: (lastPage) => lastPage.next,
        });

    const loadMore = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    if (isLoading) return <ActivityIndicator />;
    if (!data) return null;

    return (
        <FlatList
            data={data.pages.flatMap((page) => page.results)}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
                <PokemonCard name={item.name} url={item.url} />
            )}
            onEndReached={loadMore}
            numColumns={2}
            contentInsetAdjustmentBehavior="automatic"
            ListFooterComponent={() =>
                isFetchingNextPage ? <ActivityIndicator /> : null
            }
        />
    );
}
