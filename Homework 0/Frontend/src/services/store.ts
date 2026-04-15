export interface BlogObserver {
    actualizar(favoritos: string[]): void;
}

export class Store {
    private static instance: Store;
    private observadores: BlogObserver[] = [];
    public favoritos: string[] = [];

    constructor() {
        if (Store.instance) {
            return Store.instance;
        }
        Store.instance = this;
        
        const favoritosGuardados = localStorage.getItem('blog_favoritos');
        try {
            this.favoritos = favoritosGuardados ? JSON.parse(favoritosGuardados) as string[] : [];
        } catch (e) {
            console.error("Error al parsear los favoritos de localStorage", e);
            this.favoritos = [];
        }
    }

    suscribir(observador: BlogObserver): void {
        this.observadores.push(observador);
        observador.actualizar(this.favoritos);
    }

    desuscribir(observador: BlogObserver): void {
        this.observadores = this.observadores.filter(obs => obs !== observador);
    }

    private notificar(): void {
        this.observadores.forEach(observador => observador.actualizar(this.favoritos));
    }

    alternarFavorito(idArticulo: string): void {
        if (this.favoritos.includes(idArticulo)) {
            this.favoritos = this.favoritos.filter(id => id !== idArticulo);
        } else {
            this.favoritos.push(idArticulo);
        }
        localStorage.setItem('blog_favoritos', JSON.stringify(this.favoritos));
        console.log("Store actualizado. Notificando observadores con:", this.favoritos);
        this.notificar();
    }
}

export const globalStore = new Store();