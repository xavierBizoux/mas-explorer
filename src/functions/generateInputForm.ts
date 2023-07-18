import { Link } from "../interfaces/api"
import { StepVariable } from "../interfaces/modules"
import { scoreData } from "./scoreData"

export const generateInputForm = (variables: StepVariable[], executor: Link) => {
  const formElement = document.createElement("form")
  formElement.id = "scoreForm"
  formElement.className = "border p-2 mt-2"
  const formTitle = document.createElement("h3")
  formTitle.innerText = "Inputs"
  formTitle.className = "bg-primary text-white p-2"
  formElement.appendChild(formTitle)
  variables.forEach((variable: StepVariable) => {
    const labelElement = document.createElement("label")
    labelElement.setAttribute("for", variable.name)
    labelElement.innerText = variable.name.toUpperCase()
    const inputElement = document.createElement("input")
    if (variable.size > 0) {
      inputElement.size = variable.size
    }
    inputElement.setAttribute("data-type", variable.type)
    inputElement.name = variable.name
    inputElement.className = "form-control"
    formElement.appendChild(labelElement)
    formElement.appendChild(inputElement)
  })
  const submitButton = document.createElement("button")
  submitButton.type = "submit"
  submitButton.innerText = "Score Data!"
  submitButton.className = "btn btn-primary col-12 mt-2"
  formElement.appendChild(submitButton)
  formElement.addEventListener("submit", async (event) => {
    event.preventDefault()
    const scoreResults = await scoreData(event, executor)
    const successEvent = new CustomEvent("scoringEnded", { detail: scoreResults })
    document.dispatchEvent(successEvent)
  })
  return formElement
}
