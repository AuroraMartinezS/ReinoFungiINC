import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_t3u2aJIzaDvRu01VSo4Tc4jvwZ7aaHM",
  authDomain: "autenticacion-d9ae1.firebaseapp.com",
  projectId: "autenticacion-d9ae1",
  storageBucket: "autenticacion-d9ae1.firebasestorage.app",
  messagingSenderId: "674528140330",
  appId: "1:674528140330:web:88998531c06a17eae13753"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const coleccionEventos = collection(db, "eventos");


onSnapshot(coleccionEventos, (snapshot) => {
    const tablaEventos = document.getElementById("tablaExhibiciones");
    tablaEventos.innerHTML = ""; // Limpia la tabla para evitar duplicados
  
    snapshot.forEach((doc) => {
      const evento = doc.data(); 
      const filaNueva = document.createElement("tr");
  
      filaNueva.innerHTML = `
        <td data-label="Exhibición">${evento.nombre}</td>
        <td data-label="Lugar">${evento.lugar}</td>
        <td data-label="Fecha">${evento.fecha}</td>
      `;
  
      tablaEventos.appendChild(filaNueva);
    });
  });