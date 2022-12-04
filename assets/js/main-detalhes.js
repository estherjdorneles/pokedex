
const pokemonMore = document.getElementById('pokemonMore')
const loadMoreInfo = document.getElementById('loadMoreInfo')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 1
let offset = 0;


function loadPokemonDetails(offset, limit) {
    pokeApis.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemonDet) => `
        <li class="pokemon ${pokemonDet.type}">
                    <span class="number">#${pokemonDet.number}</span>
                    <span class="name">${pokemonDet.name}</span>
    
                    <div class="details">
                        <ol class="types">
                            ${pokemonDet.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
    
                        <img src="${pokemonDet.photo}" 
                        alt="${pokemonDet.name}">
                    </div>

                    <div class="peso">
                    Weight: ${pokemonDet.weight}
                    </div>
                </li> 
        `
    ).join('')

        pokemonMore.innerHTML += newHtml
    })
}


loadPokemonDetails(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonDetails(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemonDetails(offset, limit)
    }
})


