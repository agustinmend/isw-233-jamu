export class PieDePaginaComponent extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if(this.children.length === 0) {
            const template = document.getElementById('tpl-pieDePagina')
            if(template) {
                this.appendChild(template.content.cloneNode(true))
            }
            else {
                console.error('plantilla tpl-pieDePagina no encontrada')
            }
        }
    }
}
customElements.define('vista-piedepagina', PieDePaginaComponent)