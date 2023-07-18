import { ApiParameters } from "../interfaces/api"
import { displayModulesList } from "./displayModulesList"
import { getMASModules } from "./getMASModules"

export const displaySearch = () => {
    const form = document.createElement("form")
    form.id = "searchForm"
    form.className = "row"
    const searchInput = document.createElement("input")
    searchInput.id = "filter"
    searchInput.type = "text"
    searchInput.className = "form-control"
    const searchInputDiv = document.createElement("div")
    searchInputDiv.className = "col-6"
    searchInputDiv.appendChild(searchInput)
    const searchLabel = document.createElement("label")
    searchLabel.setAttribute("for", "searchInput")
    searchLabel.innerText = "Module name contains: "
    searchLabel.className = "col-form-label col-auto"
    const searchDiv = document.createElement("div")
    searchDiv.className = "row col-6"
    searchDiv.appendChild(searchLabel)
    searchDiv.appendChild(searchInputDiv)
    const numberInput = document.createElement("input")
    numberInput.id = "limit"
    numberInput.type = "number"
    numberInput.className = "form-control col-1"
    numberInput.defaultValue = "20"
    const numberInputDiv = document.createElement("div")
    numberInputDiv.className = "col-4"
    numberInputDiv.appendChild(numberInput)
    const numberLabel = document.createElement("label")
    numberLabel.setAttribute("for", "numberInput")
    numberLabel.innerText = "Number of results:"
    numberLabel.className = "col-form-label col-auto"
    const numberDiv = document.createElement("div")
    numberDiv.className = "row col-4"
    numberDiv.appendChild(numberLabel)
    numberDiv.appendChild(numberInputDiv)
    const searchButton = document.createElement("button")
    searchButton.className = "btn btn-primary col-2"
    searchButton.innerText = "Search"
    form.appendChild(searchDiv)
    form.appendChild(numberDiv)
    form.appendChild(searchButton)
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const params: ApiParameters = {}
        let limitElement = document.getElementById("limit") as HTMLInputElement
        let filterElement = document.getElementById("filter") as HTMLInputElement
        console.log(limitElement.value)
        console.log(filterElement.value)
        if (limitElement.value !== null) {
            params.limit = Number(limitElement.value) + 1
        } else {
            params.limit = 20
        }
        if (filterElement.value !== "") {
            params.filter = `contains("name", "${filterElement.value?.trim()}")`
        }
        const modules = await getMASModules(params)
        const modulesViewer = displayModulesList(modules)
        document.getElementById("list")?.replaceChildren(modulesViewer)
    })
    return form
}