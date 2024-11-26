function openModal(title, category, description, price, link) {
  document.getElementById("modalnombre").textContent = title;
  document.getElementById("modaltipo").textContent = category;
  document.getElementById("modaldescripcion").textContent = description;
  document.getElementById("modalprecio").textContent = price;

  const buyButton = document.querySelector(".comprarproducto");
  buyButton.onclick = function() {
      window.location.href = link;
  };

  document.getElementById("ProductoModal").style.display = "block";
}

function closeModal() {
  document.getElementById("ProductoModal").style.display = "none";
}

//Modal de publicaciones
function openPublicationModal(titulo, tema, descripcion, enlace) {
  document.getElementById("tituloModalPublicaciones").textContent = titulo;
  document.getElementById("temaModalPublicaciones").textContent = tema;
  document.getElementById("descripcionModalPublicaciones").textContent = descripcion;
  document.getElementById("enlaceModalPublicaciones").href = enlace;

  document.getElementById("modalPublicaciones").style.display = "block";
}

function closePublicationModal() {
  document.getElementById("modalPublicaciones").style.display = "none";
}

