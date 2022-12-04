const pokeApis = {}

function convertPokeApiDetailToPokemonDetalhado(pokeDatail) {
    const pokemonDet = new PokemonDetalhado()
    pokemonDet.number = pokeDatail.id
    pokemonDet.name = pokeDatail.name

    const types =  pokeDatail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemonDet.types = types
    pokemonDet.type =type

    pokemonDet.weight = pokeDatail.weight

    pokemonDet.photo = pokeDatail.sprites.other.dream_world.front_default

    return pokemonDet
}

pokeApis.getPokemonDetails = (pokemonDet) => {
    return fetch(pokemonDet.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemonDetalhado)
}

pokeApis.getPokemons = (offset = 0, limit = 1) => {
    const url =  `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApis.getPokemonDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error))
}
