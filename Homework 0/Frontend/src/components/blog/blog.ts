import { globalStore } from "../../services/store.ts";
import { EstrategiasFiltrado } from "../../services/filtros.ts";
import { crearObservador } from "../../services/mutation-observer.ts";

export class BlogComponent extends HTMLElement {
    private obsevadorMutaciones: MutationObserver | null;
    private articulosDOM: HTMLElement[] = [];

    constructor() {
        super();
        this.obsevadorMutaciones = null;
    }

    connectedCallback(): void {
        if (this.children.length === 0) {
            const template = document.getElementById('tpl-blogs') as HTMLTemplateElement | null;
            if (template) {
                this.appendChild(template.content.cloneNode(true));
                this.iniciarComponente();
                this.configurarObservadorDOM();
            } else {
                console.error('Template no encontrado: tpl-blogs');
            }
        }
    }

    disconnectedCallback(): void {
        globalStore.desuscribir(this);
        if (this.obsevadorMutaciones) {
            this.obsevadorMutaciones.disconnect();
            this.obsevadorMutaciones = null;
        }
    }

    configurarObservadorDOM(): void {
        const contenedor = this.querySelector('#blogs');
        const contadorDOM = this.querySelector('#contador-blog');
        
        if (!contenedor || !contadorDOM) return;

        this.obsevadorMutaciones = crearObservador(
            contenedor as HTMLElement, 
            () => this.actualizarContadorUI(contadorDOM)
        );
        this.actualizarContadorUI(contadorDOM);
    }

    actualizarContadorUI(contadorDOM: Element): void {
        if (!this.articulosDOM || this.articulosDOM.length === 0) return;
        
        const visibles = this.articulosDOM.filter(articulo => {
            const estilo = window.getComputedStyle(articulo);
            return estilo.display !== 'none' && !articulo.hasAttribute('hidden');
        }).length;
        
        contadorDOM.textContent = `Resultados: ${visibles}`;
    }

    iniciarComponente(): void {
        this.articulosDOM = Array.from(this.querySelectorAll('.blog__publicacion')) as HTMLElement[];
        
        const botones = this.querySelectorAll('.blog__favorito');
        botones.forEach(boton => {
            boton.addEventListener('click', (event: Event) => {
                const target = event.target as HTMLElement; 
                console.log("Clic detectado en el botón", target);
                
                const contenedorPadre = target.closest('.blog__publicacion') as HTMLElement | null;
                if (!contenedorPadre) {
                    return;
                }

                const idArticulo = contenedorPadre.dataset.id;
                if (idArticulo) {
                    globalStore.alternarFavorito(idArticulo);
                }
            });
        });

        const botonesFiltro = this.querySelectorAll('[data-filtro]');
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', (e: Event) => {
                const target = e.target as HTMLElement;
                const tipoFiltro = target.dataset.filtro;
                
                if (tipoFiltro && EstrategiasFiltrado[tipoFiltro as keyof typeof EstrategiasFiltrado]) {
                    EstrategiasFiltrado[tipoFiltro as keyof typeof EstrategiasFiltrado](this.articulosDOM);
                }
            });
        });

        globalStore.suscribir(this);
    }

    actualizar(favoritos: string[]): void {
        console.log("El componente Blog escuchó la actualización. Datos recibidos:", favoritos);
        this.articulosDOM.forEach(articulo => {
            const id = articulo.dataset.id;
            const boton = articulo.querySelector('.blog__favorito') as HTMLElement | null;
            
            if (id && boton) {
                if (favoritos.includes(id)) {
                    boton.textContent = 'Favorito';
                    boton.style.color = 'red';
                } else {
                    boton.textContent = 'Marcar Favorito';
                    boton.style.color = '';
                }
            }
        });
    }
}

customElements.define('vista-blog', BlogComponent);