export class ContactoComponent extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if(this.children.length === 0) {
            const template = document.getElementById('tpl-contacto')
            if(template) {
                this.appendChild(template.content.cloneNode(true))
            }
            else {
                console.error('platilla no encontrada tpl-contacto')
            }
        }
    }
}
customElements.define('vista-contacto', ContactoComponent)