export class InicioComponent extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if(this.children.length === 0) {
            const template = document.getElementById('tpl-inicio')
            if(template) {
                this.appendChild(template.content.cloneNode(true))
            }
            else {
                console.error('Plantilla tpl-inicio no encontrada')
            }
        }
    }
}
customElements.define('vista-inicio', InicioComponent)