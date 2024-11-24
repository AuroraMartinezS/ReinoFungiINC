import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  getDoc
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
const coleccionProductos = collection(db, "productos");

const btnSubir = document.querySelector('.modal-footer .aceptarProducto');
const storage = getStorage();

/*FUNCIÓN PARA LIMPIAR INPUTS ANTES DE QUE SE ABRA EL MODAL DESPUÉS DE DAR CLICK EN EL BOTÓN 'AGREGAR' */
document.getElementById('btnProductos').addEventListener('click', () => {
    // Limpia los valores de los inputs
    document.getElementById('nombreProducto').value = '';
    document.getElementById('precioProducto').value = '';
    document.getElementById('descProducto').value = '';
    //document.getElementById('imagenProducto').value = '';
    document.getElementById('enlaceProducto').value = '';

    console.log("Limpio");
  });
  

  /*FUNCIÓN PARA VALIDAR Y REGISTRAR LOS DATOS EN FIREBASE */
  btnSubir.addEventListener('click', async(e)=>{
    e.preventDefault();

    const nombre = document.getElementById('nombreProducto').value;
    const precio = document.getElementById('precioProducto').value;
    const desc = document.getElementById('descProducto').value;
    //const imageFile = document.getElementById('imagenProducto').files[0];
    const enlace =  document.getElementById('enlaceProducto').value;

    const id = btnSubir.dataset.id;

    if (!nombre || !precio || !desc  || !enlace) {
        alert('Por favor, llena todos los campos y selecciona una imagen.');
        return;
      }
    
      try{
        //let imageURL = "";
        /*if (imageFile) {
            // Sube la imagen a Firebase Storage
            const storageRef = ref(storage, `imagenes_productos/${imageFile.name}`);
            const snapshot = await uploadBytes(storageRef, imageFile);
            imageURL = await getDownloadURL(snapshot.ref);
        }

          const docRef = await addDoc(coleccionEventos, {
            nombre: nombre,
            precio: precio,
            desc: desc,
            //imagen : imageURL,
            enlace : enlace

        });*/
        
        

        if(id){
            const refArticulo = doc(db, "productos", id);
            await updateDoc(refArticulo, { 
                nombre: nombre,
                precio: precio,
                desc: desc,
                //imagen : imageURL,
                enlace : enlace});
              alert("Datos actualizados exitosamente");
          }else{
            const docRef = await addDoc(coleccionProductos, {
                nombre: nombre,
                precio: precio,
                desc: desc,
                //imagen : imageURL,
                enlace : enlace
            });    
            alert("Datos registrados exitosamente");
          }


        delete btnSubir.dataset.id;
        document.getElementById('nombreProducto').value = '';
        document.getElementById('precioProducto').value = '';
        document.getElementById('descProducto').value = '';
        //document.getElementById('imagenProducto').value = '';
        document.getElementById('enlaceProducto').value = '';

        const modal = bootstrap.Modal.getInstance(document.getElementById('modalProductos'));
        modal.hide();

      }
      catch(error){
        console.error('Error al guardar el evento:', error);
        alert('Hubo un error al guardar el evento. Por favor, intenta nuevamente.');
      }

  });

  /*FUNCIÓN PARA ELIMINAR LOS DATOS Y QUE SE ACTUALICE LA TABLA EN FIREBASE */
    document.getElementById('bodyProducts').addEventListener("click", async(e)=>{
    if(e.target.classList.contains("eliminarProd")){
      const id = e.target.dataset.id; // Obtén el ID del documento
      const refProducto = doc(db, "productos", id); // Referencia al documento 
      try {
        alert("Producto eliminado correctamente.");
        await deleteDoc(refProducto); // Elimina el documento de Firestore
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
      }
    }
  });

  /*FUNCIÓN PARA EDITAR LOS DATOS Y QUE SE ACTUALICEN EN LA TABLA Y FIREBASE */
document.getElementById('bodyProducts').addEventListener("click", async(e)=>{
    if(e.target.classList.contains("editarProd")){
      const id = e.target.dataset.id; // Obtén el ID del documento
      const refProducto = doc(db, "productos", id);
  
      try {
        const articulo = await getDoc(refProducto);
        if (articulo.exists()) {
          // Llenar los inputs del modal con los datos del evento

            document.getElementById('nombreProducto').value = articulo.data().nombre;
            document.getElementById('precioProducto').value = articulo.data().precio;
            document.getElementById('descProducto').value = articulo.data().desc;
    //const imageFile = document.getElementById('imagenProducto').files[0];
            document.getElementById('enlaceProducto').value = articulo.data().enlace;
  
          // Guarda el ID en un atributo del botón de "Subir" para usarlo al actualizar
          btnSubir.dataset.id = id;
  
          const modal = new bootstrap.Modal(document.getElementById("modalProductos"));
          modal.show();
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    }
  })
  


  /*FUNCIÓN PARA MANTENER LOS DATOS DE FIREBASE ACTUALIZADOS EN LA TABLA HTML */
onSnapshot(coleccionProductos, (snapshot) => {
    const tablaProductos = document.getElementById("bodyProducts");
    tablaProductos.innerHTML = ""; // Limpia la tabla para evitar duplicados
  
    snapshot.forEach((doc) => {
      const producto = doc.data(); 
      const fila = document.createElement("tr");
  
      fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.desc}</td>
        <td>${producto.enlace}</td>
        <td>
          <button class="btn btn-warning btn-sm editarProd" data-id="${doc.id}">Editar</button>
          <button class="btn btn-danger btn-sm eliminarProd" data-id="${doc.id}">Eliminar</button>
        </td>
      `;
  
      tablaProductos.appendChild(fila);
    });
  });