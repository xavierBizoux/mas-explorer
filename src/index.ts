import { viyaUrl } from "./const"
import { displayModulesList } from "./functions/displayModulesList"
import { displayOutputs } from "./functions/displayOutputs"
import { displaySearch } from "./functions/displaySearch"
import { getMASModules } from "./functions/getMASModules"
import { ApiParameters } from "./interfaces/api"
import './scss/styles.scss'

// Define even listener for HTML page being loaded
document.addEventListener("DOMContentLoaded", async () => {
  // Generate the search element
  const searcher = displaySearch()
  // Add the search element to the searcher div
  document.getElementById("searcher")?.replaceChildren(searcher)
  // Define parameters
  const params: ApiParameters = {
    limit: 20
  }
  // Get the list of modules
  const modules = await getMASModules(params)
  // Generate the HTML elements for the module list
  const modulesViewer = displayModulesList(modules)
  // Display the module list
  document.getElementById("list")?.replaceChildren(modulesViewer)
  // Create a div element for information
  const infoMessage = document.createElement('div')
  // Write the info message
  infoMessage.innerText = "Please select a module!"
  // Assign Boostrap CSS classes to the div element
  infoMessage.className = "bg-info mt-3"
  // Display the info message
  document.getElementById("module")?.replaceChildren(infoMessage)
})

// Define an event listener for the scoringEnded event
document.addEventListener("scoringEnded", (event) => {
  if (event instanceof CustomEvent) {
    // Retrieve the "results" div
    const targetDiv = document.getElementById("results")
    // Generate the outputs element
    const outputs = displayOutputs(event.detail.outputs)
    // Display the outputs element
    targetDiv?.replaceChildren(outputs)
  }
})

// Define an event listener for authentication
document.addEventListener("authenticated", () => {
  // Check if "logoutButton" exists
  if (!document.getElementById("logoutButton")) {
    // Create a button
    const logoutButton = document.createElement("button")
    // Assign Boostrap CSS classes to the button element
    logoutButton.className = "btn btn-dark col-1"
    // Set the button id
    logoutButton.id = "logoutButton"
    // Write text to the button
    logoutButton.innerText = "Logout"
    // Add event listener to the button
    logoutButton.addEventListener("click", async () => {
      try {
        // Execute Logout REST API call
        const resp = await fetch(`${viyaUrl}/SASLogon/logout.do`, {
          credentials: 'include',
        })
        // IF logout succesful
        if (resp.status === 200) {
          // Reload the window to clear the content and force authentication
          window.location.reload()
        } else {
          throw new Error('User could not be logged out.')
        }
      } catch (e) {
        console.log(e)
      }
    })
    // Add button to the header
    document.getElementById("top")?.appendChild(logoutButton)
  }
})