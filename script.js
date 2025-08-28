let displayPokemons = document.querySelector(".display-area");
let Pokemons = [];
let search = document.querySelector(".search-input");
let notFound = document.querySelector(".notFound");
let searchLogo = document.querySelector(".search-logo")
let refreshBtn = document.querySelector(".refresh-search")

// fetching the data of pokemon
async function FetchPokemonData(id) {

    const Pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    .then((response) => response.json());
    const PokemonSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                                 .then((response) => response.json());

                                 return {Pokemon, PokemonSpecies}
}
// display logic 
async function DisplayPokemons(pokemon) {
    displayPokemons.innerHTML = ""
    pokemon.forEach((Pokemon) => {
   const  PokemonId = Pokemon.url.split("/")[6];
   const pokemonName = Pokemon.name
   const displayPokemon = document.createElement("div");
   displayPokemon.classList.add("displayPokemon");
   displayPokemon.innerHTML = 
   `<div class="pokemon-name-div">
   <p class="pokemon-name">${Pokemon.name}</p>
   </div>
   <div class="pokemon-image-div">
   <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${PokemonId}.png
"
 class="pokemon-image">

   <p class="pokemon-number">${PokemonId}</p>
   </div> `

  displayPokemon.addEventListener("click",async  () => {

    await FetchPokemonData(PokemonId);
    
        
         localStorage.setItem("selectedPokemon",PokemonId)
         window.location.href = `./pokemonPage.html?id=${PokemonId}`;
    })

   
    displayPokemons.appendChild(displayPokemon);
  


    })

}


// storing the pokemon objects in the empty array pokemon
fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
     .then((response) => response.json())
     .then(data => {Pokemons = data.results
        DisplayPokemons(Pokemons)
     });

     

     // search logic
function searching() {
  const searchedPokemon = search.value.toLowerCase().trim();
   

  if (!searchedPokemon) {
    DisplayPokemons(Pokemons); 
    notFound.style.display = "none";
    return;
  }

  const filteredPokemon = Pokemons.filter(
    (pokemon) =>{
     const  PokemonId =   pokemon.url.split("/")[6]
     return(
      pokemon.name.toLowerCase() === searchedPokemon || 
     PokemonId ===searchedPokemon
     )

});

  if (filteredPokemon.length > 0) {
    DisplayPokemons(filteredPokemon);
    notFound.style.display = "none";
  } else {
    displayPokemons.innerHTML = "";
    notFound.style.display = "block";
  }
}


searchLogo.addEventListener("click",searching)

// refresh logic 

 function refresh() {

   search.value = ""
   notFound.style.display = "none"
   DisplayPokemons(Pokemons)

 }

 refreshBtn.addEventListener("click",refresh)