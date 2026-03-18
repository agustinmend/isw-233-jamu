export function crearObservador(contenedor, callback) {
    if(!contenedor) {
        console.error('MutationObserver: se requiere un contenedor valido en el DOM')
        return null
    }
    const opciones = {
        childList : false,
        subtree : true,
        attributes: true,
        attributeFilter : ['style', 'class', 'hidden']
    }
    const observador = new MutationObserver(() => {
        callback()
    })
    observador.observe(contenedor, opciones)
    return observador
}