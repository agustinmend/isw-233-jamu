import { globalStore } from "../services/store.js"

export class BlogComponent extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if(this.children.length === 0) {
            const template = document.getElementById('tpl-Blogs')
            if(template) {
                this.appendChild(template.content.cloneNode(true))
                this.iniciarComponente()
            }
            else {
                console.error('template no encontrado tpl-Blogs')
            }
        }
    }
    disconnectedCallback() {
        globalStore.desuscribir(this)
    }
    iniciarComponente() {
        this.articulosDOM = Array.from(this.querySelectorAll('.Blog__Publicacion'))
        const botones = this.querySelectorAll('.Blog__Favorito')
        console.log(`se encontraron ${botones.length} botones de favoritos`)
        botones.forEach(boton => {
            boton.addEventListener('click', (event) => {
                console.log("Clic detectado en el botón", event.target);
                const contenedorPadre = event.target.closest('.Blog__Publicacion');
                if (!contenedorPadre) {
                    console.error("Error Arquitectónico: El botón no está dentro de un elemento con clase .Blog__Publicacion");
                    return;
                }
                const idArticulo = event.target.closest('.Blog__Publicacion').dataset.id
                console.log(`Intentando guardar en Store el artículo con ID: ${idArticulo}`);
                globalStore.alternarFavorito(idArticulo)
            })
        })
        globalStore.suscribir(this)
    }
    actualizar(favoritos) {
        console.log("El componente Blog escuchó la actualización. Datos recibidos:", favoritos);
        this.articulosDOM.forEach(articulo => {
            const id = articulo.dataset.id
            const boton = articulo.querySelector('.Blog__Favorito')
            if (favoritos.includes(id)) {
                boton.textContent = 'Favorito';
                boton.style.color = 'red';
            }
            else {
                boton.textContent = 'Marcar Favorito';
                boton.style.color = ''
            }
        })
    }
}
customElements.define('vista-blog' , BlogComponent)