import { proyectos } from "../../services/datos.ts";

export class ProyectosComponent extends HTMLElement {
    private indice: number = 0;
    private items_por_fila: number = 3;
    private observador: IntersectionObserver | null = null;

    connectedCallback(): void {
        this.renderizarEstructura();
        this.configurarObservador();
    }

    disconnectedCallback(): void {
        this.apagarObservador();
    }

    apagarObservador(): void {
        if (this.observador) {
            this.observador.disconnect();
            this.observador = null;
        }
    }

    renderizarEstructura(): void {
        const template = document.getElementById('tpl-proyectos') as HTMLTemplateElement | null;
        if (!template) {
            console.error('Plantilla tpl-proyectos no encontrada');
            return;
        }
        this.appendChild(template.content.cloneNode(true));
        this.cargarLote();
    }

    configurarObservador(): void {
        const opciones: IntersectionObserverInit = {
            rootMargin: '0px 0px 0px 0px',
            threshold: 0
        };

        this.observador = new IntersectionObserver((entradas) => {
            if (entradas[0].isIntersecting) {
                this.cargarLote();
            }
        }, opciones);

        setTimeout(() => {
            const centinela = this.querySelector('#centinela-proyectos');
            if (centinela && this.observador) {
                this.observador.observe(centinela);
            }
        }, 0);
    }

    cargarLote(): void {
        const tableroProyectos = this.querySelector('#tablero-proyectos');
        if (!tableroProyectos) return;

        const lote = proyectos.slice(this.indice, this.indice + this.items_por_fila);
        if (lote.length === 0) return;

        const templateCard = document.getElementById('tpl-proyecto-card') as HTMLTemplateElement | null;
        if (!templateCard) return;

        const fragmentoTarjetas = document.createDocumentFragment();

        lote.forEach((proyecto) => {
            const tarjeta = templateCard.content.cloneNode(true) as DocumentFragment;
            
            const imgElement = tarjeta.querySelector('.proyectos__imagen') as HTMLImageElement | null;
            const txtElement = tarjeta.querySelector('.proyectos__texto') as HTMLElement | null;

            if (imgElement) imgElement.src = proyecto.img;
            if (txtElement) txtElement.textContent = proyecto.txt;

            fragmentoTarjetas.appendChild(tarjeta);
        });

        tableroProyectos.appendChild(fragmentoTarjetas);
        this.indice += this.items_por_fila;

        if (this.indice >= proyectos.length) {
            this.apagarObservador();
        }
    }
}

customElements.define('vista-proyectos', ProyectosComponent);