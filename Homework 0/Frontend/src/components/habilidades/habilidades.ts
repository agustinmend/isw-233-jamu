export class HabilidadesComponent extends HTMLElement {
    connectedCallback(): void {
        if (this.children.length === 0) {
            const template = document.getElementById('tpl-habilidades') as HTMLTemplateElement | null;
            if (template) {
                this.appendChild(template.content.cloneNode(true));
            } else {
                console.error('Plantilla tpl-habilidades no encontrada');
            }
        }
    }
}
customElements.define('vista-habilidades', HabilidadesComponent);