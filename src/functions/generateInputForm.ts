import { Link } from "../interfaces/api"
import { StepVariable } from "../interfaces/modules"
import { scoreData } from "./scoreData"

// Function to generate the input form
export const generateInputForm = (variables: StepVariable[], executor: Link) => {
  // Create a form element
  const formElement = document.createElement("form")
  // Assign id to the form element
  formElement.id = "scoreForm"
  // Assign Boostrap CSS classes to the form element
  formElement.className = "border p-2 mt-2"
  // Create ah h3 element
  const formTitle = document.createElement("h3")
  // Write text to the h3 element
  formTitle.innerText = "Inputs"
  // Assign Boostrap CSS classes to the h3 element
  formTitle.className = "bg-primary text-white p-2"
  // Add the title element to the form
  formElement.appendChild(formTitle)
  // Loop through the input variables
  variables.forEach((variable: StepVariable) => {
    // Create a label element
    const labelElement = document.createElement("label")
    // Set the "for" attribute for the label element
    labelElement.setAttribute("for", variable.name)
    // Write the variable name to the label element
    labelElement.innerText = variable.name.toUpperCase()
    // Create an input element
    const inputElement = document.createElement("input")
    // Assign the size property of the input element
    if (variable.size > 0) {
      inputElement.size = variable.size
    }
    // Set "data-type" attribute for use when submitting the form
    inputElement.setAttribute("data-type", variable.type)
    // Define the name of the input element
    inputElement.name = variable.name
    // Assign Boostrap CSS class to the input element
    inputElement.className = "form-control"
    // Add label element to the form
    formElement.appendChild(labelElement)
    // Add input element to the form
    formElement.appendChild(inputElement)
  })
  // Create a button element
  const submitButton = document.createElement("button")
  // Define the type of the button element
  submitButton.type = "submit"
  // Write text for the button element
  submitButton.innerText = "Score Data!"
  // Assign Boostrap CSS classes to the button element
  submitButton.className = "btn btn-primary col-12 mt-2"
  // Add button element to the form
  formElement.appendChild(submitButton)
  // Add event listener for the form submission
  formElement.addEventListener("submit", async (event) => {
    event.preventDefault()
    // Execute scoring
    const scoreResults = await scoreData(event, executor)
    // Create an event to indicate the scoring completed and pass the scoring results
    const successEvent = new CustomEvent("scoringEnded", { detail: scoreResults })
    // Dispatch the event
    document.dispatchEvent(successEvent)
  })
  return formElement
}
