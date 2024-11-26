function mostrarPortafolio(categoria) {
    const portafolioSection = document.getElementById("portafolio-section");
    const portafolioContent = document.getElementById("portafolio-content");

    portafolioSection.classList.remove("oculto");
    portafolioContent.innerHTML = "";

    let contenido = "";

    switch (categoria) {
        case 'esculturas':
            contenido = `
                <div class="portfolio-item">
                    <div class="fotoportafolio">
                        <img src="Recursos/" alt="Escultura">
                    </div>
                    <div class="detalles">
                        <h3 class="nombreobra">Escultura en Mármol</h3>
                        <p class="tipoobra">Tipo: Escultura en mármol</p>
                        <p class="descripobra">Descripción de la escultura en mármol...</p>
                        <p class="autor">Autor: Azael Hernández</p>
                        <p class="fecha">Fecha: 2023</p>
                    </div>
                </div>
            `;
            break;
        case 'pinturas':
            contenido = `
                <div class="portfolio-item">
                    <div class="fotoportafolio">
                        <img src="Recursos/" alt="Pintura">
                    </div>
                    <div class="detalles">
                        <h3 class="nombreobra">Pintura al Óleo</h3>
                        <p class="tipoobra">Tipo: Pintura al óleo</p>
                        <p class="descripobra">Descripción de la pintura al óleo...</p>
                        <p class="autor">Autor: Azael Hernández</p>
                        <p class="fecha">Fecha: 2022</p>
                    </div>
                </div>
            `;
            break;
        case 'collage':
            contenido = `
                <div class="portfolio-item">
                    <div class="fotoportafolio">
                        <img src="Recursos/" alt="Collage">
                    </div>
                    <div class="detalles">
                        <h3 class="nombreobra">Collage Creativo</h3>
                        <p class="tipoobra">Tipo: Collage</p>
                        <p class="descripobra">Descripción del collage creativo...</p>
                        <p class="autor">Autor: Azael Hernández</p>
                        <p class="fecha">Fecha: 2021</p>
                    </div>
                </div>
            `;
            break;
        case 'edicion':
            contenido = `
                <div class="portfolio-item">
                    <div class="fotoportafolio">
                        <img src="Recursos/" alt="Edición">
                    </div>
                    <div class="detalles">
                        <h3 class="nombreobra">Edición Digital</h3>
                        <p class="tipoobra">Tipo: Edición digital</p>
                        <p class="descripobra">Descripción de la edición digital...</p>
                        <p class="autor">Autor: Azael Hernández</p>
                        <p class="fecha">Fecha: 2020</p>
                    </div>
                </div>
            `;
            break;
        default:
            contenido = `<p>Selecciona una categoría para ver el contenido.</p>`;
    }

    portafolioContent.innerHTML = contenido;
}

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    const lamp1 = document.querySelector('.lamp1');
    const lamp2 = document.querySelector('.lamp2');
    const hoja1 = document.querySelector('.hoja1');
    const hoja2 = document.querySelector('.hoja2');
    const hoja3 = document.querySelector('.hoja3');

    if (scrollPosition > 50) {
        lamp1.style.opacity = 1;
        lamp1.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    }
    
    if (scrollPosition > 150) {
        lamp2.style.opacity = 1;
        lamp2.style.transform = `translateY(${scrollPosition * 0.15}px)`;
    }

    if (scrollPosition > 200) {
        hoja1.style.opacity = 1;
        hoja1.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    }

    if (scrollPosition > 250) {
        hoja2.style.opacity = 1;
        hoja2.style.transform = `translateY(${scrollPosition * 0.25}px)`;
    }

    if (scrollPosition > 300) {
        hoja3.style.opacity = 1;
        hoja3.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
});
window.addEventListener("scroll", function () {
    const scrollLimit = 800; 
    const elements = document.querySelectorAll(".parallax"); 

    elements.forEach(element => {
        if (window.scrollY >= scrollLimit) {
            element.classList.add("parallax-stop");
        } else {
            element.classList.remove("parallax-stop");
        }
    });
});

