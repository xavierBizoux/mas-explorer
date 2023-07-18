export const displayOutputs = (data: { name: string, value: string | number }[]) => {
    const formElements = document.createElement("form")
    formElements.className = "border p-2 mt-2"
    const title = document.createElement("h3")
    title.innerText = "Outputs"
    title.className = "bg-primary text-white p-2"
    formElements.appendChild(title)
    data.forEach((variable) => {
        const labelElement = document.createElement("label")
        labelElement.setAttribute("for", variable.name)
        labelElement.innerText = variable.name.toUpperCase()
        const inputElement = document.createElement("input")
        inputElement.name = variable.name
        inputElement.disabled = true
        if (variable.value) {
            inputElement.value = variable.value.toString()
        }
        inputElement.className = "form-control"
        formElements.appendChild(labelElement)
        formElements.appendChild(inputElement)
    })
    return formElements
}