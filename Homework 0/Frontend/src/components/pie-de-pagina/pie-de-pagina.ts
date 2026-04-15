export class PieDePaginaComponent extends HTMLElement {
    connectedCallback(): void {
        if (this.children.length === 0) {
            const template = document.getElementById('tpl-pie-de-pagina') as HTMLTemplateElement | null;
            if (template) {
                this.appendChild(template.content.cloneNode(true));
            } else {
                console.error('Plantilla tpl-pie-de-pagina no encontrada');
            }
        }
    }
}
customElements.define('vista-piedepagina', PieDePaginaComponent);