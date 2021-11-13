
let rEquipo = JSON.parse(localStorage.getItem("equipo"))


const jugador1 = document.getElementById("jugador1");
const jugador2 = document.getElementById("jugador2");
const jugador3 = document.getElementById("jugador3");
const jugador4 = document.getElementById("jugador4");
const jugador5 = document.getElementById("jugador5");
const buttonEnv = document.getElementById("btn-enviar-equipo");
const formulario = document.querySelector(".form-equipo");
const cancha = document.querySelector(".contenedor-cancha");

$(document).ready(function(){
    $(".remover-equipo-btn").click(function(){
        cancha.innerHTML = "";

    });
  });

formulario.addEventListener('submit', submitHandler)

function submitHandler(event) {

    event.preventDefault();

    const equipo = [
        {
            nombre: jugador1.value
        },
        {
            nombre: jugador2.value
        },
        {
            nombre: jugador3.value
        },
        {
            nombre: jugador4.value
        },
        {
            nombre: jugador5.value
        },
    ]
    localStorage.setItem("equipo",  JSON.stringify(equipo));


    cancha.innerHTML = "";

    equipo.forEach((jugador, index) => createJugador(jugador, index) )
    

            

    function createJugador( jugador, index ) {
        let div = document.createElement('div');
        div.innerText = jugador.nombre;
        div.className = `jugador-cancha jug-${index + 1}`;

        cancha.appendChild(div);
    }
    console.log(equipo);
}







