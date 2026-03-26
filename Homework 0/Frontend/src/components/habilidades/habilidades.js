export class HabilidadesComponent extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if(this.children.length === 0) {
            const template = document.getElementById('tpl-habilidades')
            if(template) {
                this.appendChild(template.content.cloneNode(true))
            }
            else {
                console.error('platilla tpl-habilidades no encontrada')
            }
        }
    }
}
customElements.define('vista-habilidades', HabilidadesComponent)