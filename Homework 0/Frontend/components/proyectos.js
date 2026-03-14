export class ProyectosComponent extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if(this.children.length === 0) {
            const template = document.getElementById('tpl-proyectos')
            if(template) {
                this.appendChild(template.content.cloneNode(true))
            }
            else {
                console.error('plantilla tpl-proyectos no encontrada')
            }
        }
    }
}
customElements.define('vista-proyectos', ProyectosComponent)