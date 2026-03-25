import { crearObservadorTamanio } from "../services/resize_observer.js"
export class ContactoComponent extends HTMLElement {
    constructor() {
        super()
        this.observadorTamanio = null
    }
    connectedCallback() {
        if(this.children.length === 0) {
            const template = document.getElementById('tpl-contacto')
            if(template) {
                this.appendChild(template.content.cloneNode(true))
                this.configurarEfectoLmites()
            }
            else {
                console.error('platilla no encontrada tpl-contacto')
            }
        }
    }
    disconnectedCallback() {
        if(this.observadorTamanio) {
            this.observadorTamanio.disconnect()
            this.observadorTamanio = null
        }
    }
    configurarEfectoLmites() {
        const textarea = this.querySelector('.contacto__formulario--mensaje')
        const contenedor = this.querySelector('.contacto__formulario')
        if(!textarea || !contenedor) return
        textarea.style.resize = 'both'
        textarea.style.maxWidth = '96%'
        textarea.style.boxSizing = 'border-box'
        this.observadorTamanio = crearObservadorTamanio(textarea, (elementoCaja) => {
            const anchoMaximoPermitido = contenedor.clientWidth * 0.96
            const anchoActual = elementoCaja.offsetWidth
            if(anchoActual >= anchoMaximoPermitido - 2) {
                elementoCaja.style.border = '3px solid #0056b3'
                elementoCaja.style.outline = 'none'
            }
            else {
                elementoCaja.style.border=''
                elementoCaja.style.outline=''
            }
        })
    }

}
customElements.define('vista-contacto', ContactoComponent)