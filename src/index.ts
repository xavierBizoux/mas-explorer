import { viyaUrl } from "./const"
import { displayModulesList } from "./functions/displayModulesList"
import { displayOutputs } from "./functions/displayOutputs"
import { displaySearch } from "./functions/displaySearch"
import { getMASModules } from "./functions/getMASModules"
import { ApiParameters } from "./interfaces/api"
import './scss/styles.scss'

document.addEventListener("DOMContentLoaded", async () => {
  const searcher = displaySearch()
  document.getElementById("searcher")?.replaceChildren(searcher)
  const params: ApiParameters = {
    limit: 20
  }
  const modules = await getMASModules(params)
  const modulesViewer = displayModulesList(modules)
  document.getElementById("list")?.replaceChildren(modulesViewer)
  const infoMessage = document.createElement('div')
  infoMessage.innerText = "Please select a module!"
  infoMessage.className = "bg-info mt-3"
  document.getElementById("module")?.replaceChildren(infoMessage)
})


document.addEventListener("scoringEnded", (event) => {
  const targetDiv = document.getElementById("results")
  if (event instanceof CustomEvent) {
    const outputs = displayOutputs(event.detail.outputs)
    targetDiv?.replaceChildren(outputs)
  }
})


document.addEventListener("authenticated", () => {
  if (!document.getElementById("logoutButton")) {
    const logoutButton = document.createElement("button")
    logoutButton.className = "btn btn-dark col-1"
    logoutButton.id = "logoutButton"
    logoutButton.innerText = "Logout"
    logoutButton.addEventListener("click", async () => {
      try {
        const resp = await fetch(`${viyaUrl}/SASLogon/logout.do`, {
          credentials: 'include',
        })
        if (resp.status === 200) {
          window.location.reload()
        } else {
          throw new Error('User could not be logged out.')
        }
      } catch (e) {
        console.log(e)
      }
    })
    document.getElementById("top")?.appendChild(logoutButton)
  }
})