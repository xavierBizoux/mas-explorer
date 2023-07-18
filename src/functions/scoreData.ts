import { ApiParameters, Link } from "../interfaces/api"
import { callViyaApi } from "./callViyaApi"

export const scoreData = async (event: Event, executor: Link) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const data: { name: string, value: string | null | number }[] = []
    Array.from(form.elements).forEach((field) => {
      if (field.nodeName === "INPUT") {
        const element = field as HTMLInputElement
        if (element.getAttribute("data-type") === "decimal") {
          data.push({ name: element.name, value: parseFloat(element.value) })
        } else {
          data.push({ name: element.name, value: element.value })
        }
      }
    })
    const params : ApiParameters = {}
    params.data = JSON.stringify({ "inputs": data })
    const response = await callViyaApi(executor, params)
    return response
  }