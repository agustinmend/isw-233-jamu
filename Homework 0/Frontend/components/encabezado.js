export class EncabezadoComponent extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if(this.children.length === 0) {
            const template = document.getElementById('tpl-encabezado')
            if(template) {
                this.appendChild(template.content.cloneNode(true))
            }
            else {
                console.error('Plantilla tpl-encabezado no encontrada')
            }
        }
    }
}
customElements.define('nav-encabezado', EncabezadoComponent)