import { ApiParameters } from "../interfaces/api"
import { displayModulesList } from "./displayModulesList"
import { getMASModules } from "./getMASModules"

// Function to search for specific elements
export const displaySearch = () => {
    // Create a form element
    const form = document.createElement("form")
    // Assign an id to the form element
    form.id = "searchForm"
    // Assign Boostrap CSS class to the form element
    form.className = "row"
    // Create an input element
    const searchInput = document.createElement("input")
    // Assign an id to the input element
    searchInput.id = "filter"
    // Define the type property
    searchInput.type = "text"
    // Assign Boostrap CSS class to the input element
    searchInput.className = "form-control"
    // Create a div element
    const searchInputDiv = document.createElement("div")
    // Assign Boostrap CSS class to the div element
    searchInputDiv.className = "col-6"
    // Append the input element to the div element
    searchInputDiv.appendChild(searchInput)
    // Create a label element
    const searchLabel = document.createElement("label")
    // Define the "for" attribute for the input element
    searchLabel.setAttribute("for", "searchInput")
    // Write text for the label element
    searchLabel.innerText = "Module name contains: "
    // Assign Boostrap CSS classes to the label element
    searchLabel.className = "col-form-label col-auto"
    // Create a div element
    const searchDiv = document.createElement("div")
    // Assign Boostrap CSS classes to the div element
    searchDiv.className = "row col-6"
    // Add the label element to the div
    searchDiv.appendChild(searchLabel)
    // Add the input element to the div
    searchDiv.appendChild(searchInputDiv)
    // Create an input element
    const numberInput = document.createElement("input")
    // Assign an id to the input element
    numberInput.id = "limit"
    // Define the type of the input element
    numberInput.type = "number"
    // Assign Boostrap CSS classes to the input element
    numberInput.className = "form-control col-1"
    // Set the default value of the input element
    numberInput.defaultValue = "20"
    // Create a div element
    const numberInputDiv = document.createElement("div")
    // Assign Boostrap CSS class to the input element
    numberInputDiv.className = "col-4"
    // Add the input element to the div
    numberInputDiv.appendChild(numberInput)
    // Create a label element
    const numberLabel = document.createElement("label")
    // Set the "for" attribute of the input element
    numberLabel.setAttribute("for", "numberInput")
    // Write the text for the input element
    numberLabel.innerText = "Number of results:"
    // Assign Boostrap CSS classes to the input element
    numberLabel.className = "col-form-label col-auto"
    // Create a div element
    const numberDiv = document.createElement("div")
    // Assign Boostrap CSS classes to the div element
    numberDiv.className = "row col-4"
    // Add the label element to the div
    numberDiv.appendChild(numberLabel)
    // Add the input element to the div
    numberDiv.appendChild(numberInputDiv)
    // Create a button element
    const searchButton = document.createElement("button")
    // Assign Boostrap CSS classes to the button element
    searchButton.className = "btn btn-primary col-2"
    // Write the text for the button
    searchButton.innerText = "Search"
    // Add the different divs to the form
    form.appendChild(searchDiv)
    form.appendChild(numberDiv)
    form.appendChild(searchButton)
    // Add an event listener to the form submisssion
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        // Create a list of parameters
        const params: ApiParameters = {}
        // Retrieve the input element for the limit
        let limitElement = document.getElementById("limit") as HTMLInputElement
        // Retrieve the input element for the filter
        let filterElement = document.getElementById("filter") as HTMLInputElement
        // Set the limit parameter based on the limit field
        if (limitElement.value !== null) {
            params.limit = Number(limitElement.value) + 1
        } else {
            params.limit = 20
        }
        // Set the filter parameter based on the filter field
        if (filterElement.value !== "") {
            params.filter = `contains("name", "${filterElement.value?.trim()}")`
        }
        // Retrieve the list of modules
        const modules = await getMASModules(params)
        // Display the list of modules
        const modulesViewer = displayModulesList(modules)
        document.getElementById("list")?.replaceChildren(modulesViewer)
    })
    return form
}