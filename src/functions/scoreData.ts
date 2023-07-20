import { ApiParameters, Link } from "../interfaces/api"
import { callViyaApi } from "./callViyaApi"

// Function to score the input data
export const scoreData = async (event: Event, executor: Link) => {
  event.preventDefault()
  // Retrieve form information
  const form = event.target as HTMLFormElement
  // Create a variable to store the scoring results
  const data: { name: string, value: string | null | number }[] = []
  // Loop through the form elements
  Array.from(form.elements).forEach((field) => {
    // Only manage the "input" elements
    if (field.nodeName === "INPUT") {
      const element = field as HTMLInputElement
      // Read the form input and store the value
      if (element.getAttribute("data-type") === "decimal") {
        data.push({ name: element.name, value: parseFloat(element.value) })
      } else {
        data.push({ name: element.name, value: element.value })
      }
    }
  })
  // Create a variable to hold the parameters
  const params: ApiParameters = {}
  // Transform the data into a string
  params.data = JSON.stringify({ "inputs": data })
  // Execute the REST API call
  const response = await callViyaApi(executor, params)
  // Return the results
  return response
}