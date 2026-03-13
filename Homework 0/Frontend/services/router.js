export const Router = {
    init: () => {
        document.querySelectorAll(".Encabezado__Titulo").forEach((a) => {
            a.addEventListener("click", (event) => {
                event.preventDefault()
                const hash = event.target.getAttribute("href")
                const route = Router.hashToRoute(hash)
                Router.go(route)
            })
        })
        window.addEventListener("popstate", (event) => {
            Router.go(event.state?.route || "/", false)
        })
        Router.go(location.pathname)
    },
    hashToRoute : (hash) => {
        const routes = {
            "#inicio" : "/",
            "#SobreMi" : "/sobre-mi",
            "#Habilidades" : "habilidades",
            "#Proyectos": "/proyectos",
            "#Blogs": "/blogs",
            "#Contacto": "/contacto"
        }
        return routes[hash] || "/"
    },
    go : (route , addToHystory = true) => {
        if(addToHystory) {
            history.pushState({ route}, "", route)
        }
        const routeMap = {
            "/": "inicio",
            "/sobre-mi": "SobreMi",
            "/habilidades": "Habilidades",
            "/proyectos": "Proyectos",
            "/blogs": "Blogs",
            "/contacto": "Contacto"
        }
        const targetId = routeMap[route]
        const sections = document.querySelectorAll("#inicio, #SobreMi, #Habilidades, #Proyectos, #Blogs, #Contacto")
        sections.forEach(section => {
            section.style.display = "none"
        })
        if(targetId) {
            document.getElementById(targetId).style.display = "block"
        }
        window.scrollTo(0,0)
    }
}