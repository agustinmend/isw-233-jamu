export class PieDePaginaComponent extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if(this.children.length === 0) {
            const template = document.getElementById('tpl-pie-de-pagina')
            if(template) {
                this.appendChild(template.content.cloneNode(true))
            }
            else {
                console.error('plantilla tpl-pie-de-pagina no encontrada')
            }
        }
    }
}
customElements.define('vista-piedepagina', PieDePaginaComponent)