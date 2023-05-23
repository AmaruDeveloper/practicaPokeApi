$tituloLista = document.querySelector(".tituloLista");
$contenedorLista = document.getElementById("contenedorLista");
$contenedorLista2 = document.getElementById("contenedorLista2");

let controladorTextoTitulo = true;
$tituloLista.addEventListener("click", ()=>{
  $contenedorLista2.classList.toggle('visible');

  if(controladorTextoTitulo){
    $tituloLista.innerHTML = `<i class="fa-solid fa-list fa-beat"></i> Ocultar lista Pokémon`;
  }else{
    $tituloLista.innerHTML = `<i class="fa-solid fa-list fa-beat"></i> Mostrar lista Pokémon`;
  }

  controladorTextoTitulo = !controladorTextoTitulo;
})

fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
  .then((res) => res.json())
  .then((data) => {
    const listaPokemon = data.results;
    $lista = document.createElement("ul");
    let numero = 1;

    listaPokemon.forEach((pokemon) => {
      const $anadir = document.createElement("li");
      $anadir.classList.add(`${pokemon.name}`);
      $anadir.innerText = `${numero}. ${pokemon.name}`;
      $lista.appendChild($anadir);
      numero += 1;
    });
    /*$contenedorLista.appendChild($lista);*/
    $contenedorLista2.appendChild($lista)
  })
  .catch((error) => {
    console.log(`Error al obtener la lista de pokemon: ${error}`);
  });

setTimeout(() => {
  $listaPokemones = document.querySelectorAll("li");
  $listaPokemones.forEach((pokemon) => {

    pokemon.addEventListener("click", () => {

      /*
      //esto funcionaba de tal forma que al hacer click en el nombre de un pokemon en la lista, nos dirigía al inicio de la página
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })*/

      pokemonSeleccionado = pokemon.classList.value;
      cargarPokemon();
      console.log(pokemonSeleccionado)
      setTimeout(()=>{
        alert("Haz click en la imagen del pokemon para que te salude")
      }, 150)
      /*
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSeleccionado}`)
      .then((respuesta)=>respuesta.json())
      .then((data)=>{

        //en esta parte hasta donde termina e l template string, se está ingresando por innerhtml con un template string datos de la api
        document.getElementById("resultados").innerHTML = `
        <h1>${data.forms[0].name}</h1>
        <img src='${data.sprites.front_default}' class='pokemonImg'/>`
        
        //con respecto a la integración anterior estamos creando estos elementos y usando un bucle para meterlos también al div
        //esto sirve para los pokemon que tienen más de dos tipos
        const $fragmentoTipos = document.createElement("div")

        data.types.forEach(p =>{
          const $tipos = document.createElement("p");
          $tipos.innerHTML = `- ${p.type.name}`
          $fragmentoTipos.appendChild($tipos);
        })
        document.getElementById("resultados").appendChild($fragmentoTipos);

      })*/

    });
  });


}, 100);

const cargarPokemon = async() => {

    const re = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSeleccionado}`)
      .then((respuesta)=> respuesta.json())
      .then((data)=>{

        //en esta parte hasta donde termina e l template string, se está ingresando por innerhtml con un template string datos de la api
        document.getElementById("resultados").innerHTML = `
        <h1>${data.forms[0].name}</h1>
        <img src='${data.sprites.front_default}' class='pokemonImg'/>`
        
        //con respecto a la integración anterior estamos creando estos elementos y usando un bucle para meterlos también al div
        //esto sirve para los pokemon que tienen más de dos tipos
        const $fragmentoTipos = document.createElement("div")

        data.types.forEach(p =>{
          const $tipos = document.createElement("p");
          $tipos.innerHTML = `- ${p.type.name}`
          $fragmentoTipos.appendChild($tipos);
        })
        document.getElementById("resultados").appendChild($fragmentoTipos);

        /*Aquí recién se está creando la imagen del pokemon y de esta forma podemos hacerlo rotar con un click haciendo uso de css*/
        let jumpDistance = 10;
        $pokemonImg = document.querySelector(".pokemonImg");

        $pokemonImg.addEventListener("click", ()=>{
            //$pokemonImg.classList.toggle('rotating');
          
          for (let i = 0; i < 3; i++) {
            setTimeout(() => {
              $pokemonImg.style.transform = `translateY(${jumpDistance}px)`;
              jumpDistance = 10;
              setTimeout(() => {
                $pokemonImg.style.transform = 'translateY(0)';
              }, 100); // Duración de la animación en milisegundos
            }, i * 250); // Retraso entre cada salto en milisegundos
          }
        })

      })
}

