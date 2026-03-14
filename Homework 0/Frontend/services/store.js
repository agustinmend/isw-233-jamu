export class Store {
    constructor() {
        if(Store.instance) {
            return Store.instance
        }
        Store.instance = this
        this.observadores = []
        const favoritosGuardados = localStorage.getItem('blog_favoritos')
        this.favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) : []
    }
    suscribir(observador) {
        this.observadores.push(observador)
        observador.actualizar(this.favoritos)
    }
    desuscribir(observador) {
        this.observadores = this.observadores.filter(obs => obs !== observador)
    }
    notificar() {
        this.observadores.forEach(observador => observador.actualizar(this.favoritos))
    }
    alternarFavorito(idArticulo) {
        if(this.favoritos.includes(idArticulo)) {
            this.favoritos = this.favoritos.filter(id => id !== idArticulo)
        }
        else {
            this.favoritos.push(idArticulo)
        }
        localStorage.setItem('blogFavoritos', JSON.stringify(this.favoritos))
        console.log("Store actualizado. Notificando observadores con:", this.favoritos);
        this.notificar()
    }
}
export const globalStore = new Store()