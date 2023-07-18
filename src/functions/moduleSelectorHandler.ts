import { Item, Link } from "../interfaces/api"
import { StepVariable } from "../interfaces/modules"
import { callViyaApi } from "./callViyaApi"
import { generateInputForm } from "./generateInputForm"


export const moduleSelectionHandler = async (sourceElement: HTMLElement) => {
    if (sourceElement !== null) {
      const link = sourceElement.getAttribute('data-link')
      if (link) {
        const response = await callViyaApi(JSON.parse(link))
        response?.items.forEach(async (item: Item) => {
          const link = item.links.find(link => link.rel === "execute") as Link
          if ("inputs" in item) {
            const inputForm = generateInputForm(item.inputs as StepVariable[], link)
            document.getElementById("prompt")?.replaceChildren(inputForm)
          }
        })
      }
    }
  }