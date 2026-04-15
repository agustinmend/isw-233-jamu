// 1. Importaciones de módulos (SE ELIMINA LA EXTENSIÓN .js)
import './components/blog/blog.ts';
import './components/contacto/contacto.ts';
import './components/encabezado/encabezado.ts';
import './components/habilidades/habilidades.ts';
import './components/inicio/inicio.ts';
import './components/pie-de-pagina/pie-de-pagina.ts';
import './components/proyectos/proyectos.ts';
import './components/sobre-mi/sobre-mi.ts';

import './components/blog/blog.css';
import './components/contacto/contacto.css';
import './components/encabezado/encabezado.css';
import './components/habilidades/habilidades.css';
import './components/inicio/inicio.css';
import './components/page/page.css';
import './components/pie-de-pagina/pie-de-pagina.css';
import './components/proyectos/proyectos.css';
import './components/sobre-mi/sobre-mi.css';

import { Router } from "./services/router.ts";

document.addEventListener('DOMContentLoaded', () => {
    new Router();
});