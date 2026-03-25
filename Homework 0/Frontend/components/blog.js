import { globalStore } from "../services/store.js"
import { EstrategiasFiltrado} from "../services/filtros.js"
import { crearObservador } from "../services/mutation_observer.js"
export class BlogComponent extends HTMLElement {
    constructor() {
        super()
        this.obsevadorMutaciones = null
    }
    connectedCallback() {
        if(this.children.length === 0) {
            const template = document.getElementById('tpl-blogs')
            if(template) {
                this.appendChild(template.content.cloneNode(true))
                this.iniciarComponente()
                this.configurarObservadorDOM()
            }
            else {
                console.error('template no encontrado tpl-Blogs')
            }
        }
    }
    disconnectedCallback() {
        globalStore.desuscribir(this)
        if(this.obsevadorMutaciones) {
            this.obsevadorMutaciones.disconnect()
            this.obsevadorMutaciones = null
        }
    }
    configurarObservadorDOM() {
        const contenedor = this.querySelector('#blogs')
        const contadorDOM = this.querySelector('#contador-blog')
        if(!contenedor || !contadorDOM) return
        this.obsevadorMutaciones = crearObservador(
            contenedor,
            () => this.actualizarContadorUI(contadorDOM)
        )
        this.actualizarContadorUI(contadorDOM)
    }
    actualizarContadorUI(contadorDOM) {
        if(!this.articulosDOM) return
        const visibles = this.articulosDOM.filter(articulo => {
            const estilo = window.getComputedStyle(articulo)
            return estilo.display !== 'none' && !articulo.hasAttribute('hidden')
        }).length
        contadorDOM.textContent = `Resultados: ${visibles}`
    }
    iniciarComponente() {
        this.articulosDOM = Array.from(this.querySelectorAll('.blog__publicacion'))
        const botones = this.querySelectorAll('.blog__favorito')
        botones.forEach(boton => {
            boton.addEventListener('click', (event) => {
                console.log("Clic detectado en el botón", event.target);
                const contenedorPadre = event.target.closest('.blog__publicacion');
                if (!contenedorPadre) {
                    return;
                }
                const idArticulo = event.target.closest('.blog__publicacion').dataset.id
                globalStore.alternarFavorito(idArticulo)
            })
        })
        const botonesFiltro = this.querySelectorAll('[data-filtro]')
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const tipoFiltro = e.target.dataset.filtro
                if(EstrategiasFiltrado[tipoFiltro]) {
                    EstrategiasFiltrado[tipoFiltro](this.articulosDOM)
                }
            })
        })
        globalStore.suscribir(this)
    }
    actualizar(favoritos) {
        console.log("El componente Blog escuchó la actualización. Datos recibidos:", favoritos);
        this.articulosDOM.forEach(articulo => {
            const id = articulo.dataset.id
            const boton = articulo.querySelector('.blog__favorito')
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