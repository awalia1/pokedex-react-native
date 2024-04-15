export interface PokemonResults {
    name: string;
    url?: string;
}

export interface Pokemon {
    name: string;
    id: number;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    types: {
        slot: number;
        type: {
            name: string;
        };
    }[];
    species: {
        url: string;
    };
    moves: {
        move: {
            name: string;
            url: string;
        };
    }[];
    weight: number;
    height: number;
}

export interface AllPokemon {
    count: number;
    next: string;
    previous?: string;
    results: {
        name: string;
        url: string;
    }[];
}

export interface Species {
    base_happiness: number;
    flavor_text_entries: {
        flavor_text: string;
    }[];
    habitat: {
        name: string;
        url: string;
    };
}

export const fetchFn = async (endpoint: string) => {
    const response = await fetch(endpoint);
    return response.json();
};

export const fetchAllPokemon = async ({
    pageParam,
}: {
    pageParam?: string;
}) => {
    const response = await fetch(
        pageParam || "https://pokeapi.co/api/v2/pokemon/"
    );
    return response.json();
};

export const fetchPokemon = async (name: string) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
    if (!response.ok) {
        throw new Error(`Pokemon ${name} not found`);
    }
    return response.json();
};
