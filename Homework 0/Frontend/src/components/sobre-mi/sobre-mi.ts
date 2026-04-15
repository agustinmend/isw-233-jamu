export class SobreMiComponent extends HTMLElement {
    connectedCallback(): void {
        if (this.children.length === 0) {
            const template = document.getElementById('tpl-sobre-mi') as HTMLTemplateElement | null;
            if (template) {
                this.appendChild(template.content.cloneNode(true));
            } else {
                console.error('Plantilla tpl-sobre-mi no encontrada');
            }
        }
    }
}
customElements.define('vista-sobremi', SobreMiComponent);