/*
Utilizando fetch y asycn/await realizar las siguientes peticiones simples a la api de pokémon https://pokeapi.co/docs/v2
a. Obtener detalles de un Pokémon por nombre
b. Obtener habilidades de un Pokémon específico
c. Obtener información sobre un tipo específico de Pokémon (por ejemplo, agua)
d. Obtener una lista de los primeros 50 Pokémon
2. Utilizando fetch y asycn/await realizar la siguiente petición compuesta a la api de pokémon https://pokeapi.co/docs/v2
a. Obtener el nombre y el tipo de un Pokémon, así como el nombre y el tipo de su evolución

*/

async function obtenerDetallesPokemonPorNombre(nombre) {
  try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      const datos = await respuesta.json();
      return datos;
  } catch (error) {
      console.error('Error fetching Pokemon details:', error);
  }
}

async function obtenerPokemonHabilidades(nombre) {
  try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      const datos = await respuesta.json();
      return datos.abilities;
  } catch (error) {
      console.error('Error fetching Pokemon abilities:', error);
  }
}

async function obtenerTipoPokemon(tipoNombre) {
  try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/type/${tipoNombre}`);
      const datos = await respuesta.json();
      return datos;
  } catch (error) {
      console.error('Error fetching Pokemon type:', error);
  }
}

async function getFirst50Pokemon() {
  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=50`);
      const data = await response.json();
      return data.results;
  } catch (error) {
      console.error('Error fetching first 50 Pokemon:', error);
  }
}

async function getEvolutionDetails(pokemonName) {
  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      const evolutionChainResponse = await fetch(data.species.url);
      const evolutionChainData = await evolutionChainResponse.json();
      const evolutionChainId = evolutionChainData.evolution_chain.url.split("/")[6];
      const evolutionChain = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}`);
      const evolutionChainJson = await evolutionChain.json();
      return evolutionChainJson;
  } catch (error) {
      console.error('Error fetching evolution details:', error);
  }
}

// Ejemplo de uso:
(async () => {
  const pokemonDetalles = await obtenerDetallesPokemonPorNombre('pikachu');
  console.log('Detalles de Pikachu:', pokemonDetalles);

  const pikachuHabilidades = await obtenerPokemonHabilidades('pikachu');
  console.log('Habilidades de Pikachu:', pikachuHabilidades);

  const waterTipoPokemon = await obtenerTipoPokemon('water');
  console.log('Pokémon de tipo agua:', waterTipoPokemon);

  const first50Pokemon = await getFirst50Pokemon();
  console.log('Primeros 50 Pokémon:', first50Pokemon);

  const evolutionDetails = await getEvolutionDetails('pikachu');
  console.log('Detalles de evolución de Pikachu:', evolutionDetails);
})();

