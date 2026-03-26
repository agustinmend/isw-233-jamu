import { proyectos } from "../../services/datos.js"
export class ProyectosComponent extends HTMLElement {
    constructor() {
        super()
        this.indice = 0
        this.items_por_fila = 3
        this.observador = null
    }
    connectedCallback() {
        this.renderizarEstructura()
        this.configurarObservador()
    }
    disconnectedCallback() {
        this.apagarObservador()
    }
    apagarObservador() {
        if(this.observador) {
            this.observador.disconnect()
            this.observador = null
        }
    }
    renderizarEstructura() {
        const template = document.getElementById('tpl-proyectos')
        if(!template) {
            console.error('plantilla tpl-proyectos no encontrada')
            return
        }
        this.appendChild(template.content.cloneNode(true))
        this.cargarLote()
    }
    configurarObservador() {
        const opciones = {
            rootMargin: '0px 0px 0px 0px',
            threshold: 0
        }
        this.observador = new IntersectionObserver((entradas) => {
            if(entradas[0].isIntersecting) {
                this.cargarLote()
            }
        }, opciones)
        setTimeout(() => {
            const centinela = this.querySelector('#centinela-proyectos')
            if(centinela) this.observador.observe(centinela)
        }, 0)
    }
    cargarLote() {
        const tableroProyectos = this.querySelector('#tablero-proyectos')
        if(!tableroProyectos) return
        const lote = proyectos.slice(this.indice, this.indice + this.items_por_fila)
        if(lote.length === 0) return
        const templateCard = document.getElementById('tpl-proyecto-card')
        const fragmentoTarjetas = document.createDocumentFragment()
        lote.forEach((proyecto) => {
            const tarjeta = templateCard.content.cloneNode(true)
            tarjeta.querySelector('.proyectos__presentacion--imagen').src = proyecto.img
            tarjeta.querySelector('.proyectos__presentacion--texto').textContent = proyecto.txt
            fragmentoTarjetas.appendChild(tarjeta)
        })
        tableroProyectos.appendChild(fragmentoTarjetas)
        this.indice += this.items_por_fila
        if(this.indice >= proyectos.length && observador) {
            this.disconnectedCallback()
        }
    }
}
customElements.define('vista-proyectos', ProyectosComponent)