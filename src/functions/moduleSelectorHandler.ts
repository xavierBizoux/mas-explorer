import { Item, Link } from "../interfaces/api"
import { StepVariable } from "../interfaces/modules"
import { callViyaApi } from "./callViyaApi"
import { generateInputForm } from "./generateInputForm"


export const moduleSelectionHandler = async (sourceElement: HTMLElement) => {
  if (sourceElement !== null) {
    // Generate a h2 HTML element to display the selected module name
    const moduleName = document.createElement("h2")
    // Assign Boostrap CSS classes to the header element
    moduleName.className = "bg-primary text-white center p-2 mt-5"
    // Write the selected model name inside the header element
    moduleName.innerText = `Module: ${sourceElement.innerText.toUpperCase()}`
    // Write the header element into the HTML element named "module"
    document.getElementById("module")?.replaceChildren(moduleName)
    // Empty the "results" element
    document.getElementById("results")?.replaceChildren("")
    // Retrieve link information which will be passed to the callViyaApi function
    const link = sourceElement.getAttribute('data-link')
    if (link) {
      // Execute a call to the REST API
      const response = await callViyaApi(JSON.parse(link))
      // Loop through the items element of the response object
      response?.items.forEach(async (item: Item) => {
        // Retrieve the link element needed for execution
        const link = item.links.find(link => link.rel === "execute") as Link
        // Check if model has inputs property
        if ("inputs" in item) {
          // Generate an input form using the inputs
          const inputForm = generateInputForm(item.inputs as StepVariable[], link)
          // Add the input form to the HTML div named prompt
          document.getElementById("prompt")?.replaceChildren(inputForm)
        }
      })
    }
  }
}