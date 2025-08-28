
//header
const nameOfPokemon = document.querySelector(".name");
const IdOfPokemon = document.querySelector(".number");


//info
const pokemonImg = document.querySelector(".pokemon-image");
const height = document.querySelector(".height");
const weight = document.querySelector(".weight");
const abilities = document.querySelector(".Abilities");


//description
const description = document.querySelector(".description");


//stats
const HP = document.querySelector(".HP");
const attack = document.querySelector(".Attack");
const defence = document.querySelector(".Defence");
const specialAttack = document.querySelector(".special-attack");
const specialDefence = document.querySelector(".special-defence");

//type
const types = document.querySelector(".types");


let Id = JSON.parse(localStorage.getItem("selectedPokemon"));
const stats = document.querySelector(".stats");

//next button
const next = document.querySelector(".next-pokemon-button")

//fetching pokemon data and displaying

async function FetchPokemonData(id) {

 const Pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    .then((response) => response.json());
const PokemonSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                                 .then((response) => response.json());
console.log(Pokemon)

nameOfPokemon.innerText = `${Pokemon.name}`;
IdOfPokemon.innerText = `#${Id}`;
pokemonImg.innerHTML = `

<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Id}.png">

`
height.innerText = `Height: ${Pokemon.height}`;
weight.innerText = `Weight: ${Pokemon.weight}`;
abilities.innerText = "Abilities: " + Pokemon.abilities.map(a => a.ability.name).join(", ");

stats.innerText = Pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join("\n");
types.innerText = Pokemon.types.map(t => `${t.type.name}`).join(", ");
description.innerHTML =  PokemonSpecies.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text

               
return {Pokemon, PokemonSpecies} 

                                 
}

FetchPokemonData(Id);

function nextPage() {
    FetchPokemonData(Id+1)
    pokemonImg.innerHTML = `

<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Id+1}.png">

`
    Id = Id +1
    
}

// next pokemon 

next.addEventListener("click",nextPage)


