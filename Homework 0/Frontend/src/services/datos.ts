export interface Proyecto {
    img: string;
    txt: string;
}

export const proyectos: Proyecto[] = [
    { img: "/components/proyectos/__imagen/tienda.jpg" , txt: "Sistema de Tiendas en linea Pagina Web de manejo de tiendas en linea usando C# como backend y Angular como frontend"},
    { img: "/components/proyectos/__imagen/pedido.jpg" , txt: "Sistema de Pedidos en linea Pagina Web de manejo de Pedidos a diferentes ciudades enfocado en usar buenas estructuras de datos"},
    { img: "/components/proyectos/__imagen/consultorio.jpg" , txt: "Sistema de citas medicas en linea Pagina Web de manejo de las citas medicas de una clinica enfocada en usar las buenas practicas como principios SOLID y patrones de diseño"},
    { img: "/components/proyectos/__imagen/biblioteca.jpeg" , txt: "Sistema de gestion para una biblioteca enfocada en usar herramientas de Base de datos como ser indices, store procedures y triggers"},
    { img: "/components/proyectos/__imagen/arqui.jpg" , txt: "Simulador de arquitectura de computadora desarrollado para mostrar de forma entendible como funciona una computadora internamente"},
    { img: "/components/proyectos/__imagen/psicologo.jpg" , txt: "Manejador de citas para psicologo desarrollado con el fin de ofrecer una solucion al manejo de citas a papel clasico"},
    { img: "/components/proyectos/__imagen/residencial.jpg" , txt: "Sistema de reservas de residencial, proyecto para el manejo de un residencial con operaciones CRUD y opcion de migracion de la BD entre sql server y mysql"}  
];