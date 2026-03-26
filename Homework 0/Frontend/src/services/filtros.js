import { globalStore } from "./store.js";

export const EstrategiasFiltrado = {
    todos: (articulos) => articulos.forEach(art => art.style.display = 'block'),
    
    desarrollo: (articulos) => articulos.forEach(art => {
        art.style.display = art.dataset.categoria === 'desarrollo' ? 'block' : 'none';
    }),
    
    diseno: (articulos) => articulos.forEach(art => {
        art.style.display = art.dataset.categoria === 'diseno' ? 'block' : 'none';
    }),
    
    favoritos: (articulos) => {
        const favs = globalStore.favoritos
        articulos.forEach(art => {
            art.style.display = favs.includes(art.dataset.id) ? 'block' : 'none';
        });
    }
};