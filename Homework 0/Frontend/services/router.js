export const Router = {
    init: () => {
        document.querySelectorAll("a.nav__link").forEach((a) => {
            a.addEventListener("click", (event) => {
                event.preventDefault()
                const href = event.target.getAttribute("href")
                Router.go(href)
            })
        })
        window.addEventListener("popstate", (event) => {
            Router.go(event.state.route , false)
        })
        Router.go(location.pathname)
    }
}