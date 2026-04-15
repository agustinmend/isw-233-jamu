import { globalStore } from "./store.ts";

type EstrategiaFiltrado = (articulos: HTMLElement[]) => void;

export const EstrategiasFiltrado: Record<string, EstrategiaFiltrado> = {
    todos: (articulos) => articulos.forEach(art => art.style.display = 'block'),
    
    desarrollo: (articulos) => articulos.forEach(art => {
        art.style.display = art.dataset.categoria === 'desarrollo' ? 'block' : 'none';
    }),
    
    diseno: (articulos) => articulos.forEach(art => {
        art.style.display = art.dataset.categoria === 'diseno' ? 'block' : 'none';
    }),
    
    favoritos: (articulos) => {
        const favs: string[] = globalStore.favoritos; 
        
        articulos.forEach(art => {
            const id = art.dataset.id;
            if (id && favs.includes(id)) {
                art.style.display = 'block';
            } else {
                art.style.display = 'none';
            }
        });
    }
};