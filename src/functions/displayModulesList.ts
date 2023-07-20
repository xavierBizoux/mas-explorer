import { Module, ModulesList } from "../interfaces/modules"
import { moduleSelectionHandler } from "./moduleSelectorHandler"

// Function to display the list of modules
export const displayModulesList = (modules: ModulesList) => {
    // Generate a unordered list HTML element
    const list = document.createElement("ul")
    // Assign a Bootstrap CSS class to the list
    list.className = "list-group"
    // Number of valid models
    let numberOfModels = 0
    // Loop through the list of modules
    modules.items.forEach((item: Module) => {
        // Keep only the modules with score step
        if (item.stepIds?.includes("score")) {
            numberOfModels += 1
            // Generate a HTML list element
            const listElement = document.createElement("li")
            // Write the model name into the list element
            listElement.innerText = item.name
            // Assign a Bootstrap CSS class to the list element
            listElement.className = "list-group-item"
            // Retrieve link for the score step
            const scoreLink = item.links.find(link => link.rel === "steps")
            // Add a data-link property to the list element to pass information when clicked
            listElement.setAttribute("data-link", JSON.stringify(scoreLink))
            // Define an event listener for click event on the list element
            listElement.addEventListener("click", (event) => {
                if (event && event.target instanceof HTMLElement) {
                    // Execute a function
                    moduleSelectionHandler(event.target)
                }
            })
            list.appendChild(listElement)
        }
    })
    // Check if some models where selected and generate a dummy element for user information
    if (numberOfModels === 0) {
        // Generate a HTML list element
        const listElement = document.createElement("li")
        // Write the model name into the list element
        listElement.innerText = "No model was listed for scoring"
        // Assign a Bootstrap CSS class to the list element
        listElement.className = "list-group-item"
        // Append dummy element
        list.appendChild(listElement)
    }
    return list
}