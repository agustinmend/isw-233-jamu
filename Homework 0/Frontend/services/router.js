export class Router {
    constructor() {
        if(Router.instance) {
            return instance
        }
        Router.instance = this
        this.rutas = {
            '/' : 'vista-inicio',
            '/sobremi' : 'vista-sobremi',
            '/habilidades' : 'vista-habilidades',
            '/proyectos' : 'vista-proyectos',
            '/blog' : 'vista-blog',
            '/contacto' : 'vista-contacto'
        }
        this.appRoot = document.getElementById('app-root')
        if(!this.appRoot) {
            console.error('no se encontro el contenedor app-route')
            return
        }
        this.init()
    }
    init() {
        document.body.addEventListener('click', (event) => {
            if(event.target.matches('[data-link]')) {
                event.preventDefault()
                const ruta = event.target.getAttribute('href')
                this.go(ruta)
            }
        })
        window.addEventListener('popstate', () => {
            this.render(window.location.pathname)
        })
        this.render(window.location.pathname    )
    }
    go(ruta) {
        window.history.pushState({}, '', ruta)
        this.render(ruta)
    }
    render(ruta) {
        const nombreComponente = this.rutas[ruta] || 'vista-inicio'
        this.appRoot.innerHTML = ''
        const vista = document.createElement(nombreComponente)
        this.appRoot.appendChild(vista)
    }
}