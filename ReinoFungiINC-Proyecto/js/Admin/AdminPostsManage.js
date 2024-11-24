import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  getDoc,
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
const coleccionPublicaciones = collection(db, "publicaciones");

/*FUNCIÓN PARA LIMPIAR INPUTS ANTES DE QUE SE ABRA EL MODAL DESPUÉS DE DAR CLICK EN EL BOTÓN 'AGREGAR' */
document.getElementById('btnPosts').addEventListener('click', () => {
    // Limpia los valores de los inputs
    document.getElementById('titulo').value = '';
    document.getElementById('emocion').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('enlace').value = '';
  
    console.log("Limpio");
  });

  /*FUNCIÓN PARA VALIDAR Y REGISTRAR LOS DATOS EN FIREBASE */
const btnSubir = document.querySelector('.modal-footer .aceptarBlog');

btnSubir.addEventListener('click', async (e)=> {
    e.preventDefault();

    const title = document.getElementById('titulo').value;
    const topic = document.getElementById('emocion').value;
    const desc = document.getElementById('desc').value;
    const link = document.getElementById('enlace').value;

  const id = btnSubir.dataset.id;

  // Validación: Verifica que los campos no estén vacíos
  if (!title || !topic || !desc) {
    alert('Por favor, llena todos los campos antes de subir.');
    return;
  }

  try{
    if(id){
        const refEvento = doc(db, "publicaciones", id);
        await updateDoc(refEvento, { 
            titulo: title,
            tema: topic,
            desc: desc,
            enlace : link});

            console.log("Datos actualizados exitosamente");
    }else{

        const docRef = await addDoc(coleccionPublicaciones, {
            titulo: title,
            tema: topic,
            desc: desc,
            enlace : link
          });
    
          console.log("Datos registrados exitosamente");

    }


    delete btnSubir.dataset.id;
    document.getElementById('titulo').value = ' ';
    document.getElementById('emocion').value = ' ';
    document.getElementById('desc').value = ' ';
    document.getElementById('enlace').value = ' ';

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalBlog'));
    modal.hide();
  }
  catch(error){
    console.error('Error al guardar el evento:', error);
    alert('Hubo un error al guardar el evento. Por favor, intenta nuevamente.');
  }
})
  

/*FUNCIÓN PARA ELIMINAR LOS DATOS Y QUE SE ACTUALICE LA TABLA EN FIREBASE */
document.getElementById('bodyPublicaciones').addEventListener("click", async(e)=>{
    if(e.target.classList.contains("eliminarPost")){
      const id = e.target.dataset.id; // Obtén el ID del documento
      const refPost = doc(db, "publicaciones", id); // Referencia al documento 
      try {
        alert("Evento eliminado correctamente.");
        await deleteDoc(refPost); // Elimina el documento de Firestore
      } catch (error) {
        console.error("Error al eliminar el articulo:", error);
      }
    }
  });

  /*FUNCIÓN PARA EDITAR LOS DATOS Y QUE SE ACTUALICEN EN LA TABLA Y FIREBASE */
document.getElementById('bodyPublicaciones').addEventListener("click", async(e)=>{
    if(e.target.classList.contains("editarPost")){
      const id = e.target.dataset.id; // Obtén el ID del documento
      const refPost = doc(db, "publicaciones", id);
  
      try {
        const articulo = await getDoc(refPost);
        if (articulo.exists()) {
          // Llenar los inputs del modal con los datos del evento
          document.getElementById('titulo').value = articulo.data().titulo;
          document.getElementById('emocion').value = articulo.data().tema;
          document.getElementById('desc').value = articulo.data().desc;
          document.getElementById('enlace').value = articulo.data().enlace;
  
          // Guarda el ID en un atributo del botón de "Subir" para usarlo al actualizar
          btnSubir.dataset.id = id;
  
          // Abre el modal (Bootstrap)
          const modal = new bootstrap.Modal(document.getElementById("modalBlog"));
          modal.show();
        }
      } catch (error) {
        console.error("Error al obtener el articulo:", error);
      }
    }
});


  /*FUNCIÓN PARA MANTENER LOS DATOS DE FIREBASE ACTUALIZADOS EN LA TABLA HTML */
  onSnapshot(coleccionPublicaciones, (snapshot) => {
    const tablaPublicaciones = document.getElementById("bodyPublicaciones");
    tablaPublicaciones.innerHTML = ""; // Limpia la tabla para evitar duplicados
  
    snapshot.forEach((doc) => {
      const post = doc.data(); 
      const fila = document.createElement("tr");
  
      fila.innerHTML = `
        <td>${post.titulo}</td>
        <td>${post.tema}</td>
        <td>${post.desc}</td>
        <td>${post.enlace}</td>
        <td>
          <button class="btn btn-warning btn-sm editarPost" data-id="${doc.id}">Editar</button>
          <button class="btn btn-danger btn-sm eliminarPost" data-id="${doc.id}">Eliminar</button>
        </td>
      `;
  
      tablaPublicaciones.appendChild(fila);
    });
  });