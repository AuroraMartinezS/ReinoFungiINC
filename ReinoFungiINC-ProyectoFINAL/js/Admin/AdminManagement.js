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
const coleccionEventos = collection(db, "eventos");

/*FUNCIÓN PARA LIMPIAR INPUTS ANTES DE QUE SE ABRA EL MODAL DESPUÉS DE DAR CLICK EN EL BOTÓN 'AGREGAR' */
document.getElementById('btnEventos').addEventListener('click', () => {
  // Limpia los valores de los inputs
  document.getElementById('nombreEvento').value = '';
  document.getElementById('dondeEvento').value = '';
  document.getElementById('cuandoEvento').value = '';

  console.log("Limpio");
});


/*FUNCIÓN PARA VALIDAR Y REGISTRAR LOS DATOS EN FIREBASE */
const btnSubir = document.querySelector('.modal-footer .aceptarEvent');

btnSubir.addEventListener('click', async (e)=> {
  e.preventDefault();
  const name = document.getElementById('nombreEvento').value;
  const place = document.getElementById('dondeEvento').value;
  const date = document.getElementById('cuandoEvento').value;

  const id = btnSubir.dataset.id;

  // Validación: Verifica que los campos no estén vacíos
  if (!name || !place || !date) {
    alert('Por favor, llena todos los campos antes de subir.');
    return;
  }

  try{

    if(id){
      const refEvento = doc(db, "eventos", id);
      await updateDoc(refEvento, { 
        nombre: name,
        lugar: place,
        fecha: date});
        console.log("Datos actualizados exitosamente");
    }else{
      const docRef = await addDoc(coleccionEventos, {
        nombre: name,
        lugar: place,
        fecha: date
      });

      console.log("Datos registrados exitosamente");
    }

    delete btnSubir.dataset.id;
    document.getElementById('nombreEvento').value = '';
    document.getElementById('dondeEvento').value = '';
    document.getElementById('cuandoEvento').value = '';
    

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEventos'));
    modal.hide();
  }catch(error){
    console.error('Error al guardar el evento:', error);
    alert('Hubo un error al guardar el evento. Por favor, intenta nuevamente.');
  }

});


/*FUNCIÓN PARA ELIMINAR LOS DATOS Y QUE SE ACTUALICE LA TABLA EN FIREBASE */
document.getElementById('bodyEventos').addEventListener("click", async(e)=>{
  if(e.target.classList.contains("eliminarEvento")){
    const id = e.target.dataset.id; // Obtén el ID del documento
    const refEvento = doc(db, "eventos", id); // Referencia al documento 
    try {
      alert("Evento eliminado correctamente.");
      await deleteDoc(refEvento); // Elimina el documento de Firestore
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  }
});


/*FUNCIÓN PARA EDITAR LOS DATOS Y QUE SE ACTUALICEN EN LA TABLA Y FIREBASE */
document.getElementById('bodyEventos').addEventListener("click", async(e)=>{
  if(e.target.classList.contains("editarEvento")){
    const id = e.target.dataset.id; // Obtén el ID del documento
    const refEvento = doc(db, "eventos", id);

    try {
      const evento = await getDoc(refEvento);
      if (evento.exists()) {
        // Llenar los inputs del modal con los datos del evento
        document.getElementById("nombreEvento").value = evento.data().nombre;
        document.getElementById("dondeEvento").value = evento.data().lugar;
        document.getElementById("cuandoEvento").value = evento.data().fecha;

        // Guarda el ID en un atributo del botón de "Subir" para usarlo al actualizar
        btnSubir.dataset.id = id;

        // Abre el modal (Bootstrap)
        const modal = new bootstrap.Modal(document.getElementById("modalEventos"));
        modal.show();
      }
    } catch (error) {
      console.error("Error al obtener el evento:", error);
    }
  }
})


/*FUNCIÓN PARA MANTENER LOS DATOS DE FIREBASE ACTUALIZADOS EN LA TABLA HTML */
onSnapshot(coleccionEventos, (snapshot) => {
  const tablaEventos = document.getElementById("bodyEventos");
  tablaEventos.innerHTML = ""; // Limpia la tabla para evitar duplicados

  snapshot.forEach((doc) => {
    const evento = doc.data(); 
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${evento.nombre}</td>
      <td>${evento.lugar}</td>
      <td>${evento.fecha}</td>
      <td>
        <button class="btn btn-warning btn-sm editarEvento" data-id="${doc.id}">Editar</button>
        <button class="btn btn-danger btn-sm eliminarEvento" data-id="${doc.id}">Eliminar</button>
      </td>
    `;

    tablaEventos.appendChild(fila);
  });
});