import { Module, ModulesList } from "../interfaces/modules"
import { moduleSelectionHandler } from "./moduleSelectorHandler"

export const displayModulesList = (modules: ModulesList) => {
    const list = document.createElement("ul")
    list.className = "list-group"
    modules.items.forEach((item: Module) => {
        if (item.stepIds?.includes("score")) {
            const listElement = document.createElement("li")
            listElement.innerText = item.name
            listElement.className = "list-group-item"
            const scoreLink = item.links.find(link => link.rel === "steps")
            listElement.setAttribute("data-link", JSON.stringify(scoreLink))
            listElement.addEventListener("click", (event) => {
                if (event && event.target instanceof HTMLElement) {
                    const moduleName = document.createElement("h2")
                    moduleName.className = "bg-primary text-white center p-2 mt-5"
                    moduleName.innerText = `Module: ${event.target.innerText.toUpperCase()}`
                    document.getElementById("module")?.replaceChildren(moduleName)
                    moduleSelectionHandler(event.target)
                }
            })
            list.appendChild(listElement)
        }
    })
    return list
}