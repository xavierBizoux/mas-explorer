// Function to display the result of the scoring
export const displayOutputs = (data: { name: string, value: string | number }[]) => {
    // Create a form to have similar look and feel for input and output
    const formElements = document.createElement("form")
    // Assign Boostrap CSS classes to the form
    formElements.className = "border p-2 mt-2"
    // Create a h3 element
    const title = document.createElement("h3")
    // Write the text for the h3 element
    title.innerText = "Outputs"
    // Assign Boostrap CSS classes to the h2 element
    title.className = "bg-primary text-white p-2"
    // Add the title to the form
    formElements.appendChild(title)
    // Loop through the list of inputs
    data.forEach((variable) => {
        // Create a label element
        const labelElement = document.createElement("label")
        // Define the "for" attribute of the label element
        labelElement.setAttribute("for", variable.name)
        // Write the text for the label
        labelElement.innerText = variable.name.toUpperCase()
        // Create an input element
        const inputElement = document.createElement("input")
        // Give a name for the input element
        inputElement.name = variable.name
        // Disable the input element as it should not be updated
        inputElement.disabled = true
        // Add a value property to the element if it exists
        if (variable.value) {
            inputElement.value = variable.value.toString()
        }
        // Assign Boostrap CSS class to the form element
        inputElement.className = "form-control"
        // Add the label element to the form
        formElements.appendChild(labelElement)
        // Add the input element to the form
        formElements.appendChild(inputElement)
    })
    return formElements
}