export function crearObservadorTamanio(elemento, callback) {
    if(!elemento) {
        console.error('elemento invalido')
        return null
    }
    const observador = new ResizeObserver((entradas) => {
        callback(entradas[0].target)
    })
    observador.observe(elemento)
    return observador
}