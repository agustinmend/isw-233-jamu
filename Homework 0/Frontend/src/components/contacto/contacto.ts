import { crearObservadorTamanio } from "../../services/resize-observer.ts";

export class ContactoComponent extends HTMLElement {
    private observadorTamanio: ResizeObserver | null;

    constructor() {
        super();
        this.observadorTamanio = null;
    }

    connectedCallback(): void {
        if (this.children.length === 0) {
            const template = document.getElementById('tpl-contacto') as HTMLTemplateElement | null;
            if (template) {
                this.appendChild(template.content.cloneNode(true));
                this.configurarEfectoLmites();
            } else {
                console.error('Plantilla no encontrada: tpl-contacto');
            }
        }
    }

    disconnectedCallback(): void {
        if (this.observadorTamanio) {
            this.observadorTamanio.disconnect();
            this.observadorTamanio = null;
        }
    }

    configurarEfectoLmites(): void {
        const textarea = this.querySelector('.contacto__formulario--mensaje') as HTMLTextAreaElement | null;
        const contenedor = this.querySelector('.contacto__formulario') as HTMLElement | null;

        if (!textarea || !contenedor) return;

        textarea.style.resize = 'both';
        textarea.style.maxWidth = '96%';
        textarea.style.boxSizing = 'border-box';

        this.observadorTamanio = crearObservadorTamanio(textarea, (elementoCaja: Element) => {
            const cajaHTML = elementoCaja as HTMLElement;
            
            const anchoMaximoPermitido = contenedor.clientWidth * 0.96;
            const anchoActual = cajaHTML.offsetWidth;

            if (anchoActual >= anchoMaximoPermitido - 2) {
                cajaHTML.style.border = '3px solid #0056b3';
                cajaHTML.style.outline = 'none';
            } else {
                cajaHTML.style.border = '';
                cajaHTML.style.outline = '';
            }
        });
    }
}

customElements.define('vista-contacto', ContactoComponent);