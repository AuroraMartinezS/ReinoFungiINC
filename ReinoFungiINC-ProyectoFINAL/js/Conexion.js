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

  onSnapshot(coleccionProductos, (snapshot) => {
    const contenedorProductos = document.getElementById("contenedorProductos"); 
    contenedorProductos.innerHTML = ""; 

    snapshot.forEach((doc) => {
        const producto = doc.data(); 

        const productoDiv = document.createElement("div");
        productoDiv.className = "Productos"; 
        productoDiv.setAttribute(
            "onclick",
            `openModal('${producto.nombre}', 'Producto', '${producto.descripcion}', 'Precio: ${producto.precio}', '${producto.enlace}')`
        );

        productoDiv.innerHTML = `
            <div class="ImagenProducto" style="background-image: url('assets/SeccionVentas/Producto.png');"></div>
            <div class="InfoProducto">
                <p class="NombreProducto">${producto.nombre}</p>
                <p class="PrecioProducto">Precio: ${producto.precio}</p>
            </div>
        `;

        contenedorProductos.appendChild(productoDiv);
    });
});


  //Función para mostrar las PUBLICACIONES en el FrontEnd

  onSnapshot(coleccionPublicaciones, (snapshot) => {
    const contenedorPosts = document.querySelector(".card-list");
    contenedorPosts.innerHTML = "";
  
    snapshot.forEach((doc) => {
      const publicacion = doc.data();
  
      const publicacionDiv = document.createElement("li");
      publicacionDiv.className = "card-item swiper-slide";
  
      publicacionDiv.setAttribute(
        "onclick",
        `openPublicationModal('${publicacion.titulo}', '${publicacion.tema}', '${publicacion.descripcion}', '${publicacion.enlace}')`
      );
  
      publicacionDiv.innerHTML = `
        <a href="javascript:void(0)" class="card-link">
          <img src="assets/SeccionBlog/BlogPic1.jpg" width="100%" class="card-image" alt="${publicacion.titulo}">
          <p class="badge">${publicacion.tema}</p>
          <h2 class="card-title">${publicacion.titulo}</h2>
          <button class="card-button material-symbols-outlined">
            favorite
          </button>
        </a>
      `;
  
      contenedorPosts.appendChild(publicacionDiv);
    });
  });
  
  
  

