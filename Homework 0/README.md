# Introduccion
Este proyecto consiste en el desarrollo de un portafolio web personal de un estudiante de ingenieria de Software, el sitio funciona como una carta de presentacion digital que muestra su formacion academica, proyectos en los que ha participado y sus habilidades tecnicas que posea
# Estructura del Proyecto

El proyecto está organizado de manera modular para facilitar el mantenimiento y la escalabilidad de los estilos.

## Archivos principales

### index.html
Archivo principal que contiene el marcado semántico de todas las secciones del portafolio.

### styles.css
Archivo maestro que gestiona la importación de todos los módulos de estilos.

## Carpeta css/

Contiene los archivos especializados por sección:

- inicio.css
- SobreMi.css
- Habilidades.css
- Proyectos.css
- Blog.css
- Contacto.css
- Redes.css

Cada archivo define los estilos específicos de su respectiva sección.

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
