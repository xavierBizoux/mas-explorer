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