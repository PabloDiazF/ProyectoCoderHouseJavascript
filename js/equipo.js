//Elementos del html que se necesitan para el funcionamiento de la pagina
const formularioCargaJugadores = document.getElementById('form-carga-jugador');
const inputNombre = document.getElementById('input-nombre-jugador');
const selectPosicionJugador = document.getElementById('select-posicion-jugador');
const listaJugadores = document.querySelector('.lista-jugadores')

//Elementos de la cancha
const contendorCancha = document.querySelector('.contenedor-cancha')
const areasCancha = document.querySelectorAll('.area');

//Eventos de escucha / Events Listeners
window.addEventListener('DOMContentLoaded', cargarJugadoresLocalStorage);
window.addEventListener('DOMContentLoaded', posicionarJugadorEnCancha);
formularioCargaJugadores.addEventListener('submit', cargarJugador)


//Funciones
function cargarJugador(event) {
    event.preventDefault();

    const jugador = {
        nombre: inputNombre.value,
        posicion: selectPosicionJugador.value,
        goles : 0,
        tarjetas: {
            amarillas: 0,
            azules: 0,
            rojas: 0
        }
    }

    //Crear Jugador
    crearJugador(jugador);
    //Guardar el jugador en el localStorage en el item equipo
    guardarJugadorEnLocalStorage(jugador);

    posicionarJugadorEnCancha()

    //Resetear el formulario
    formularioCargaJugadores.reset();
}

function crearJugador(jugador) {

    /*
        <div class="jugador">
            <img src="images/perfil-jugador.jpg" alt="">
            <p>Pablo Diaz</p>
            <small>Volante</small>
        </div>
    */

    //Hacemos el html desde javascript
    const jugadorHtml = document.createElement('div');
    jugadorHtml.classList.add('jugador');

    const nombreJugador = document.createElement('p');
    nombreJugador.textContent = jugador.nombre;

    const posicionJugador = document.createElement('small');
    posicionJugador.textContent = jugador.posicion;

    //Crear etiqueta img y ponerle el src

    //Apendchild de img a jugadorHtml

    jugadorHtml.appendChild(nombreJugador);
    jugadorHtml.appendChild(posicionJugador);


    //Metemons el nodo del jugador en la lista de jugadores
    listaJugadores.appendChild(jugadorHtml);
}

function guardarJugadorEnLocalStorage(jugador) {


    //JSON.stringify() convierte un objeto en un string
    //JSON.parse() convierte un string en un objeto
    
    //Ver si hay algo en el localStorage
    let equipo = localStorage.getItem('equipo');

    if (equipo === null) {   
        equipo = [];
    } else {
        equipo = JSON.parse(equipo);
    }

    equipo.push(jugador);

    localStorage.setItem('equipo', JSON.stringify(equipo));

}

//Ver si hay un equipo en el localStorage y agregarlo a la lista de jugadores
function cargarJugadoresLocalStorage() {

    let equipo = localStorage.getItem('equipo');

    if (equipo === null) {
        return;
    } else {
        equipo = JSON.parse(equipo);
    }

    equipo.forEach((jugador) => {
        crearJugador(jugador);
    })
}

function posicionarJugadorEnCancha() {

    const jugadores = Array.from(listaJugadores.children) ;
    
    if (!jugadores) {
        return;
    }
    
    let posicionFinal = 0;

    areasCancha.forEach((area) => {

              

        area.addEventListener('click', (e) => {
            areasCancha.forEach((area) => {
                area.classList.remove('active')
            })
            //Le doy la clase active asi se queda marcado como en el :hover
            e.target.classList.add('active');
            posicionFinal = e.target.classList[1];
        })
    })
    
    jugadores.forEach((jugador) => {

        jugador.addEventListener('click', (e) => {

            if (posicionFinal === 0) {
                alert('Selecciona una posicion de la cancha primero')
                return;
            }

            const nombreJugadorSeleccionado = e.target.firstElementChild.innerText;

            const areaSeleccionada = document.querySelector(`.${posicionFinal}`);

            //Borro si hay un jugador en el area
            areaSeleccionada.innerHTML = '';

            const div = document.createElement('div');
            div.classList.add('jugador-cancha');

            const nombreJugador = document.createElement('p');
            nombreJugador.textContent = nombreJugadorSeleccionado;

            const span = document.createElement('span');
            span.textContent = 'x';

            span.addEventListener('click', (e) => {
                e.target.parentElement.remove();
            })

            div.appendChild(nombreJugador);
            div.appendChild(span);


            areaSeleccionada.appendChild(div);

            areaSeleccionada.classList.remove('active');

            posicionFinal = 0;
        })
    })





    // areasCancha.forEach((area) => {
    //     area.addEventListener('dragover', function(event) {
    //         event.preventDefault();
    //     });

    //     area.addEventListener('drop', function(event) {
    //         event.preventDefault();
    //         const jugador = event.dataTransfer.getData('jugador');
    //         console.log(jugador);
    //         area.appendChild(document.querySelector(`#${jugador}`));
    //     });
    // })

}































// let rEquipo = JSON.parse(localStorage.getItem("equipo"))

// const jugador1 = document.getElementById("jugador1");
// const jugador2 = document.getElementById("jugador2");
// const jugador3 = document.getElementById("jugador3");
// const jugador4 = document.getElementById("jugador4");
// const jugador5 = document.getElementById("jugador5");
// const buttonEnv = document.getElementById("btn-enviar-equipo");
// const formulario = document.querySelector(".form-equipo");
// const cancha = document.querySelector(".contenedor-cancha");

// $(document).ready(function(){
//     $(".remover-equipo-btn").click(function(){
//         cancha.innerHTML = "";
//     });
// });

// formulario.addEventListener('submit', submitHandler)

// function submitHandler(event) {

//     event.preventDefault();

//     const equipo = [
//         {
//             nombre: jugador1.value
//         },
//         {
//             nombre: jugador2.value
//         },
//         {
//             nombre: jugador3.value
//         },
//         {
//             nombre: jugador4.value
//         },
//         {
//             nombre: jugador5.value
//         },
//     ]
//     localStorage.setItem("equipo",  JSON.stringify(equipo));


//     cancha.innerHTML = "";

//     equipo.forEach((jugador, index) => createJugador(jugador, index) )
    

            

//     function createJugador( jugador, index ) {
//         let div = document.createElement('div');
//         div.innerText = jugador.nombre;
//         div.className = `jugador-cancha jug-${index + 1}`;

//         cancha.appendChild(div);
//     }
//     console.log(equipo);
// }







