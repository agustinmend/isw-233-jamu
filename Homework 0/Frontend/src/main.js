import './components/blog/blog.js'
import './components/contacto/contacto.js'
import './components/encabezado/encabezado.js'
import './components/habilidades/habilidades.js'
import './components/inicio/inicio.js'
import './components/pie-de-pagina/pie-de-pagina.js'
import './components/proyectos/proyectos.js'
import './components/sobre-mi/sobre-mi.js'
import './components/blog/blog.css'
import './components/contacto/contacto.css'
import './components/encabezado/encabezado.css'
import './components/habilidades/habilidades.css'
import './components/inicio/inicio.css'
import './components/page/page.css'
import './components/pie-de-pagina/pie-de-pagina.css'
import './components/proyectos/proyectos.css'
import './components/sobre-mi/sobre-mi.css'
import { Router } from "./services/router.js";

document.addEventListener('DOMContentLoaded', () => {
    new Router()
})
