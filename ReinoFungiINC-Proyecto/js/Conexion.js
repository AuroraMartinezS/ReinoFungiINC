import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your web app's Firebase configuration DEJAR COMO ESTÁ
const firebaseConfig = {
  apiKey: "AIzaSyA_t3u2aJIzaDvRu01VSo4Tc4jvwZ7aaHM",
  authDomain: "autenticacion-d9ae1.firebaseapp.com",
  projectId: "autenticacion-d9ae1",
  storageBucket: "autenticacion-d9ae1.firebasestorage.app",
  messagingSenderId: "674528140330",
  appId: "1:674528140330:web:88998531c06a17eae13753"
};

// Initialize Firebase. DEJAR COMO ESTÁ.
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const coleccionEventos = collection(db, "eventos");
const coleccionProductos = collection(db, "productos");
const coleccionPublicaciones = collection(db, "publicaciones");

//Función para mostrar los EVENTOS en el FrontEnd
onSnapshot(coleccionEventos, (snapshot) => {
    const tablaEventos = document.getElementById("tablaExhibiciones"); //Se accede al elemento/container donde irán los datos de la base de datos.
    tablaEventos.innerHTML = ""; //Limpia la constante
  
    snapshot.forEach((doc) => { //El forEach funciona para acceder a cada dato en FireBase.
      const evento = doc.data(); //Esta constante accede a un elemento de la base en Firebase.
      const filaNueva = document.createElement("tr"); 
      //Crea una nueva fila (en este caso aplica porque Eventos es una tabla.) Puede cambiar en publicaciones (porque es un carrusel) y en Productos (porque es un contenedor diferente)

      filaNueva.innerHTML = `
        <td data-label="Exhibición">${evento.nombre}</td>
        <td data-label="Lugar">${evento.lugar}</td>
        <td data-label="Fecha">${evento.fecha}</td>
      `;
      //Se crea un nuevo elemento. El ".nombre", ".lugar", y ".fecha" son los campos de cada colección en firebase. Asegurate que esten bien escritos tal como en la base para que funcionen.
  
      tablaEventos.appendChild(filaNueva); //Se adjunta el nuevo elemento.
    });
  });

  
  //Función para mostrar los PRODUCTOS en el FrontEnd

  onSnapshot(coleccionProductos, (snapshot)=>{

  });

  //Función para mostrar las PUBLICACIONES en el FrontEnd

  onSnapshot(coleccionPublicaciones, (snapshot)=>{

  });

