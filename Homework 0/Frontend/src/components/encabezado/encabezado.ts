export class EncabezadoComponent extends HTMLElement {
    connectedCallback(): void {
        if (this.children.length === 0) {
            const template = document.getElementById('tpl-encabezado') as HTMLTemplateElement | null;            
            if (template) {
                this.appendChild(template.content.cloneNode(true));
            } else {
                console.error('Plantilla tpl-encabezado no encontrada');
            }
        }
    }
}

customElements.define('nav-encabezado', EncabezadoComponent);