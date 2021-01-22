const { message } = require('statuses');
const tmi = require('tmi.js');

// Definiendo las opciones de configuracion
const opts = {
    identity: {
        username: '',
        //Contraseña generada y proporcionada por twitch
        password: ''
    },
    channels: [
        //El nombre de tu canal
        'alongamecrafter'
    ]
};


//Cosas del juego necesarias para iniciar

let palabras = ['twitch', 'suscriptor', 'juego', 'soundtrack', 'musica', 'bit', 'like'];
let palabraEscogida = palabras[aleatorio(0, palabras.length - 1)];
let aciertos = [];
let ganadores = [];
let usuarioenturno = '';
let juegoterminado = 1;
let palabrarevelada = [];
let numFallos = 0;


// Crea la conexion del cliente con la configuracion
const client = new tmi.client(opts);

client.on('message', onMessageHandler); //Cuando recibe un mensaje en el chat
client.on('connected', onConnectedHandler); //Cuando se conecta al servidor de chat el bot

// Conectar a Twitch:
client.connect();


function jugador(nombre,puntuacion) {
    this.nombre=nombre;
    this.puntuacion=puntuacion;
}

function agregarjugador(nombre){

    if(ganadores == ''){
        var nuevojugador = new jugador(nombre,0);
        ganadores.push(nuevojugador);
    }

    if(ganadores != ''){
        ganadores.forEach((jugador)=>{
            if(jugador["nombre"]==nombre){
                jugador["puntuacion"]++;
            }
        })
    }

}


// Llamada cada vez que ingresa un mensaje al chat

function onMessageHandler(target, tags, msg, self) {
    if (self) { return; } // Ignora mensajes del mismo bot


    //Remover espacios en blanco del mensaje tal como \n \t 
    const commandName = msg.trim();
    //Variable que guarda la letra que envia el usuario para el juego
    let miletra = msg.trim().toLowerCase();
    
    if ((miletra.length == 1) && (numFallos < 7) && (juegoterminado == 0) && (usuarioenturno == tags.username)) {
    
        //Buscamos si la letra enviada esta dentro de la palabra
        if (palabraEscogida.indexOf(miletra) != -1) {
        
            //Si la palabra ya esta dentro de los aciertos no se penaliza pero da un mensaje de advertencia
            if(aciertos.indexOf(miletra) != -1){
                client.say(target, `Ya has usado la letra TableHere pero te perdono :3 `);
            }else{

            //Si la letra no esta en los aciertos, la agrega 

                aciertos.push(miletra);

                //Para ir reemplazando los _ por las letras correctas
                for (var j = 0; j < palabraEscogida.length; j++) {
                    if (miletra == palabraEscogida[j]) {
                        palabrarevelada[j] = miletra;
                    }
                }
                
                client.say(target, `Le has atinado a una letra PrimeRlyTho PartyPopper \n Palabra: ${palabrarevelada}`);
            }
            
            
            //Vemos si el usuario ya ha completado la palabra
            if (estanTodas(aciertos, palabraEscogida)) {
                juegoterminado = 1;
                client.say(target, `Adivinaste la palabra: ${palabraEscogida}  BegWan `);
                agregarjugador(usuarioenturno);
            }
        } else {
            //Si el usuario no le atina a una letra de la palabra
            numFallos++;
            MuestraErrores(numFallos);
            //Finalizamos el juego si ya ha perdido
            if (numFallos == 6) {
                client.say(target, `Has perdido, ni modo a dormir FlipThis  `);
                juegoterminado = 1;
            }
        }
    } else {
       //Por si el usuario ingresa palabras en vez de letras 
    }

    //Lista de comandos
    switch (commandName) {
        case ('!Ahorcado'):
            if(juegoterminado == 1){
                //Se reinician las variables en cada nuevo intento para evitar errores 
                usuarioenturno = tags.username;
                client.say(target, `Empezemos de nuevo! GlitchNRG  \n Sediendo el turno a LUL :${usuarioenturno} LUL `);
                palabraEscogida = palabras[aleatorio(0, palabras.length - 1)];
                aciertos = [];
                numFallos = 0;
                palabrarevelada = [];
                juegoterminado = 0;
    //LLenamos la palabra con _ para que el usuario pueda ir viendo sus aciertos en el chat
    for (let index = 0; index < palabraEscogida.length; index++) {
        palabrarevelada.push('_');
    }
    client.say(target, `Tu palabra tiene ${palabraEscogida.length.toString()} silabas \n ${palabrarevelada}`);
            }else{
                //Por si existe una sesion de juego y alguien escribe !Ahorcado
                client.say(target, `Esperando a terminar sesion en curso para iniciar nueva! \n usuario jugador ${usuarioenturno}`);
            }
            break;
            //Mostrar a los ganadores con su puntuacion
            case ('!Ganadores'):
                if(ganadores == ''){
                    client.say(target, `Aun no hay ganadores en este directo, animate a ser el primero:
                    Escribe -> !Ahorcado en el chat :D`);        
                }else{
                    ganadores.forEach((jugador)=>{
                        client.say(target, `PartyPopper Jugador:${jugador.nombre} \n Puntuacion:${jugador.puntuacion}`)
                    });
                }
            break;
        default:
            //Por si los comandos no existen, pero al ingresar letras muestra el error 
            break;
    }

    function MuestraErrores(numerrores) {
        if (numFallos > 0) {
            client.say(target, `Ha aparecido tu torax ScaredyCat \n Te quedan 5 intentos`);
        }
        if (numFallos > 1) {
            client.say(target, "Ha aparecido el brazo izquierdo (Manco) ScaredyCat \n Te quedan 4 intentos");
        }
        if (numFallos > 2) {
            client.say(target,"Ha aparecido el brazo derecho (Aun mas manco) ScaredyCat \n Te quedan 3 intentos");
        }
        if (numFallos > 3) {
            client.say(target,"Ha aparecido tu pierna derecha ScaredyCat \n Te quedan 2 intentos");
        }
        if (numFallos > 4) {
            client.say(target,"Ha aparecido tu pierna izquierda ScaredyCat \n Te quedan 1 intento");
        }
        if (numFallos > 5) {
            client.say(target,"!Que le pongan la cabeza! ScaredyCat");
        }
    }
    

}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Conectado a  ${addr} en el puerto :${port}`);
}
//Selecciona un numero aleatorio para poder escoger la palabra dependiendo de cuantas existan
function aleatorio(inferior, superior) {
    numPosibilidades = superior - inferior + 1
    aleat = Math.random() * numPosibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
}

//Busca la letra en el arreglo
function esta(caracter, miarray){
    for(var j=0;j<miarray.length;j++){
    if (caracter==miarray[j]){
          return true;
    }else{
       }
    }
    return false;
    }



//Cuando gana
function estanTodas(arrayAciertos, mipalabra) {
    for (var i = 0; i < mipalabra.length; i++) {
        if (!esta(mipalabra.charAt(i), arrayAciertos))
            return false;
    }
    return true;
}


