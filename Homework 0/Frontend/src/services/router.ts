export class Router {
    private rutas: Record<string, string> = {
        '/': 'vista-inicio',
        '/sobremi': 'vista-sobremi',
        '/habilidades': 'vista-habilidades',
        '/proyectos': 'vista-proyectos',
        '/blog': 'vista-blog',
        '/contacto': 'vista-contacto'
    };
    
    private appRoot: HTMLElement | null = null;

    constructor() {
        this.appRoot = document.getElementById('app-root');
        
        if (!this.appRoot) {
            console.error('No se encontró el contenedor app-root');
            return;
        }

        this.init();
    }

    private init(): void {
        document.body.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const link = target.closest('[data-link]');

            if (link) {
                event.preventDefault();
                const ruta = link.getAttribute('href');
                if (ruta) {
                    this.go(ruta);
                }
            }
        });

        window.addEventListener('popstate', () => {
            this.render(window.location.pathname);
        });

        this.render(window.location.pathname);
    }

    public go(ruta: string): void {
        window.history.pushState({}, '', ruta);
        this.render(ruta);
    }

    private render(ruta: string): void {
        const nombreComponente = this.rutas[ruta] || 'vista-inicio';
        
        if (this.appRoot) {
            this.appRoot.innerHTML = '';
            const vista = document.createElement(nombreComponente);
            this.appRoot.appendChild(vista);
        }
    }
}

export const globalRouter = new Router();