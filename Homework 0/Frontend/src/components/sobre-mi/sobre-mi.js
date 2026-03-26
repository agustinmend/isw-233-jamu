export class SobreMiComponent extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if(this.children.length === 0) {
            const template = document.getElementById('tpl-sobre-mi')
            if(template) {
                this.appendChild(template.content.cloneNode(true))
            }
            else {
                console.error('plantilla tpl-SobreMi no encontrada')
            }
        }
    }
}
customElements.define('vista-sobremi', SobreMiComponent)