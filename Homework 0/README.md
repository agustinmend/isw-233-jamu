# Introduccion
Este proyecto consiste en el desarrollo de un portafolio web personal de un estudiante de ingenieria de Software, el sitio funciona como una carta de presentacion digital que muestra su formacion academica, proyectos en los que ha participado y sus habilidades tecnicas que posea
# Estructura del Proyecto

El proyecto está organizado de manera modular para facilitar el mantenimiento y la escalabilidad de los estilos.

## Archivos principales

## index.js
Archivo que contiene el router y las importaciones necesarias para hacer que la pagina funcione

### index.html
Archivo principal que contiene el marcado semántico de todas las secciones del portafolio.

### styles.css
Archivo maestro que gestiona la importación de todos los módulos de estilos.

## Carpeta blocks/

Contiene los archivos especializados por sección:

- inicio.css
- SobreMi.css
- Habilidades.css
- Proyectos.css
- Blog.css
- Contacto.css
- Redes.css

Cada archivo define los estilos específicos de su respectiva sección.

## Carpeta components/
Contiene los componentes centrados en sus responsabilidades:

- blog.js
- contacto.js
- encabezado.js
- habilidades.js
- inicio.js
- pieDePagina.js
- proyectos.js
- sobreMi.js
 
## Patrones de diseño usados

### Singleton
Se vio la necesidad de usar el patron de diseño Singleton debido a que un enrutador SPA debe tener una unica instancia, permitir tener varias instancias podria generar problemas de colision

### Singleton
Se uso el patron Singleton para mantener una unica instancia al Store, debido a que ahora mismo es el que maneja los datos y para evitar problemas de concurrencia

### Observer
Se implemento el patron Observer para el estado de los favoritos, se concidero que el patron era el adecuado para esta tarea, su sistema de suscripcion se lo considero ideal para manejar los favoritos y su relacion con el Store

### Strategy
El patron Strategy fue usado para la funcionalidad de filtros con el objetivo de hacer el codigo abierto a extension se uso Strategy para definir distintas strategias de busqueda en los filtros

## Observer APIs
### IntersectionObserver
*Donde se implemento*: proyectos.js
*Que problema resuelve*: El bloqueo del hilo principal causado por la carga y renderizado de nodos HTML de forma simultanea(Lazy loading)
*Por que esta API*: El evento scroll es síncrono y se dispara cientos de veces por segundo. Forzar al navegador a leer la geometría del DOM en cada iteración del scroll causa Layout Thrashing, lo que destruye el rendimiento y baja los cuadros por segundo, IntersectionObserver soluciona esto delegando la vigilancia geométrica a un subproceso interno del navegador, ejecutando el callback en el hilo de JavaScript únicamente cuando se cruza el umbral asíncronamente, garantizando un impacto computacional casi nulo.

### MutationObserver
*Donde se implemento*: mutation_observer.js blog.js
*Que problema resuelve*: Mantiene sincronizado el estado visual de la interfaz (un contador dinámico de "Resultados: X") reaccionando a las alteraciones del árbol DOM causadas por el sistema de filtros
*Por que esta API*: Al usar MutationObserver logramos un patrón de programación reactiva nativa. El contador es autónomo: "escucha" los cambios de estado en el contenedor de artículos de forma pasiva. Si mañana se introduce una nueva forma de ocultar artículos (ej. una barra de búsqueda de texto o borrado desde el servidor), el contador se actualizará automáticamente sin tocar una sola línea de la lógica de los botones, garantizando la escalabilidad del componente.

### ResizeObserver
*Donde se implemento*: resize_observer.js contacto.js
*Que problema resuelve*: Provee feedback visual interactivo (alerta de límite de tamaño) cuando el usuario manipula elementos redimensionables arbitrariamente previniendo que la mutación manual sobrepase los límites del diseño de su contenedor padre inmediato.
*Por que esta API*: ResizeObserver es la única API que ofrece acceso al objeto contentRect de forma eficiente, permitiendo que la aplicación tome decisiones lógicas (como alertas visuales o recalibración de layouts internos) basadas en el tamaño real y fluido del componente en el DOM.

## Adaptabilidad

### movile.css
Archivo dedicado exclusivamente a las reglas de adaptabilidad para dispositivos móviles.

# Que se hace
La plataforma ofrece una experiencia de navegación fluida (Single Page) con las siguientes funcionalidades:

## Navegación Intuitiva
Menú superior con anclajes que dirigen al usuario a secciones específicas como "Proyectos" o "Sobre mí".

## Exhibición de Habilidades
Clasificación visual de competencias en Frontend, Backend y herramientas de desarrollo.

## Galería de Proyectos
Muestra de sistemas desarrollados (tiendas, pedidos y citas médicas) con descripciones técnicas.

## Blog Integrado
Espacio para la publicación de artículos sobre buenas prácticas y experiencias de aprendizaje.

## Canal de Contacto
Formulario funcional para la recepción de mensajes directos.

# Cómo se hace

El desarrollo siguió un flujo de trabajo lineal y técnico dividido en tres fases críticas:

## Fase de Prototipado (Figma)
Se inició con la definición visual de alta fidelidad, estableciendo una guía de estilos que incluye la paleta cromática, tipografías. Esto permitió validar la experiencia de usuario (UX) antes de la escritura de código.

## Fase de Estructuración (HTML5)
Se tradujo el diseño a un maquetado. Se priorizó el uso de etiquetas de bloque y contenedores con identificadores únicos (id) para habilitar la navegación por anclajes, permitiendo que el menú redirija fluidamente a secciones como Proyectos o Sobre mí.

## Fase de Estilizado y Metodología BEM
Para la capa visual, se aplicó la nomenclatura BEM (Block, Element, Modifier). Esto se refleja en clases como `.Habilidades__Segmento--Icono`, lo cual garantiza que los estilos sean independientes, modulares y fáciles de identificar en la estructura del proyecto.

## Implementación de Adaptabilidad
Utilizando un enfoque de escritorio primero, se integraron Media Queries para reconfigurar el flujo de los contenedores, asegurando que la jerarquía visual se mantenga íntegra en dispositivos móviles.

# Por qué se hace
Las decisiones metodológicas de este proceso buscan elevar la calidad técnica del producto final:

## Fidelidad del Diseño
El Figma garantiza que la interfaz implementada sea un reflejo exacto de la visión creativa, evitando inconsistencias en espaciados, colores y alineaciones.

## Escalabilidad y Orden con BEM
Se utilizó la nomenclatura BEM para evitar la especificidad excesiva del CSS y los conflictos de cascada. Esto permite que el código sea legible para otros ingenieros y que el portafolio pueda crecer con nuevos módulos sin riesgo de "romper" estilos existentes.

## Eficiencia en el Mantenimiento
La modularización del código, dividiendo los estilos en archivos específicos (Habilidades.css, Proyectos.css, etc.), responde a la necesidad de localizar y corregir errores de forma quirúrgica, una práctica esencial en el desarrollo de software profesional.

## Optimización de la Navegación
Se implementó para reducir la fricción del usuario, permitiendo un acceso inmediato a la información relevante (como el contacto o los repositorios de GitHub) sin recargas de página.

# Conversaciones con IA
https://gemini.google.com/share/660f6a25ec79
https://gemini.google.com/share/ea9244d03f1b
https://gemini.google.com/share/d60c02c04af5
https://gemini.google.com/share/7908dc3d94a0
https://gemini.google.com/share/6bcc35ddaeb1
https://chatgpt.com/share/69bb65ed-2470-8002-aca6-341d844b28df