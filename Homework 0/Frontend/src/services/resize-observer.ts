export function crearObservadorTamanio(elemento: Element | null, callback: (target: Element) => void): ResizeObserver | null {
    if (!elemento) {
        console.error('ResizeObserver: elemento inválido');
        return null;
    }
    
    const observador = new ResizeObserver((entradas: ResizeObserverEntry[]) => {
        if (entradas.length > 0) {
            callback(entradas[0].target);
        }
    });
    
    observador.observe(elemento);
    return observador;
}