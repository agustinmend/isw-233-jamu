export function crearObservador(contenedor: Element | null, callback: () => void): MutationObserver | null {
    if (!contenedor) {
        console.error('MutationObserver: se requiere un contenedor válido en el DOM');
        return null;
    }
    
    const opciones: MutationObserverInit = {
        childList: false,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'hidden']
    };
    
    const observador = new MutationObserver(() => {
        callback();
    });
    
    observador.observe(contenedor, opciones);
    return observador;
}