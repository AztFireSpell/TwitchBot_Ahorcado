# TwitchBot_Ahorcado

El archivo bot.js contiene los archivos de configuracion para poder ejecutar un juego del ahorcado "tradicional" en el chat en vivo de tu canal de Twitch.

El proyecto parte de la documentacion oficial de 
`https://dev.twitch.tv/docs/irc`

<h1>Requerimentos</h1>  <br> Solamente tener node instalado si no es asi puedes instalarlo desde aqui: https://nodejs.org/en/

Para ejecutar el bot solamente escribes:

`$ node bot.js`

<h1>¿Que hace actualmente el juego?</h1>
<ul>
<li>Para iniciar el juego en el chat del stream se debe escribir <b>!Ahorcado</b></li> 
<li>El juego va por turnos es decir, si un usuario lo inicia otro no podra jugar hasta que acabe la sesion en turnos.</li>
<li>El bot "detecta" las letras que el usuario actual ingresa al chat para ir poniendo a la palabra.</li>
<li>Si la letra ya esta repetida entonces le indica que ya no puede usarla, si no entonces se ira indicando en el chat los intentos restantes.</li>
<li>Una vez que se tenga el juego terminado otro usuario puede usar el comando !Ahorcado para poder iniciar un nuevo juego</li>
<li>Los ganadores se podran visualizar escribiendo la palabra !Ganadores en el chat, mostrando el nombre y la puntuacion</li>
<li>La puntuacion incrementa dependiendo de las veces que han completado palabras en el chat</li>
</ul>
    
<h1>Video Demostracion del Bot </h1>

https://www.youtube.com/watch?v=kUgTzBQiIQs&t=7s&ab_channel=alongamecrafter
