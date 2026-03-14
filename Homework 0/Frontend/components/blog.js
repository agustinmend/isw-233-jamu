export class BlogComponent extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        if(this.children.length === 0) {
            const template = document.getElementById('tpl-Blogs')
            if(template) {
                this.appendChild(template.content.cloneNode(true))
            }
            else {
                console.error('template no encontrado tpl-Blogs')
            }
        }
    }
}
customElements.define('vista-blog' , BlogComponent)