import { CookieAuthenticationCredential } from "@sassoftware/sas-auth-browser"
import { viyaUrl } from "../const"
import { ApiParameters, ApiResponse, Link } from "../interfaces/api"

// Variable to store the CSRF Token that is required for POST requests
let csrfToken: string | null = null
// Constant holding the information about the authentication
const sasInstance = new CookieAuthenticationCredential({ url: viyaUrl })

// Function to call REST APIs
export const callViyaApi = async (link: Link, params?: ApiParameters): Promise<ApiResponse | null> => {
    // User authentication before executing calls to REST APIs
    try {
        // Check if user is authenticated
        await sasInstance.checkAuthenticated()
    } catch {
        await sasInstance.loginPopup()
    }
    // Dispatch event that the user is authenticated for processing by other components
    document.dispatchEvent(new Event("authenticated"))
    // Create HTTP headers for the request
    const headers = new Headers
    if (link.type) {
        headers.set("Content-type", `${link.type}+json`)
    }
    if (link.responseType) {
        headers.set("Accept", `${link.responseType}+json`)
    }
    if (csrfToken !== null) {
        headers.set("x-csrf-token", csrfToken)
    }
    // Build the request parameters
    const config: RequestInit = {
        credentials: "include",
        headers: headers,
        method: link.method,
    }
    // Add data to the body for POST requests
    if (params?.data !== undefined) {
        config.body = params.data
    }
    // Generate the URL parameters to be added if limit or filter are passed to the function
    const urlParams = new URLSearchParams()
    if (params?.limit !== undefined) {
        urlParams.set("limit", params.limit.toString())
    }
    if (params?.filter !== undefined) {
        urlParams.set("filter", params.filter)
    }
    // Build the URL for the request
    let url = `${viyaUrl}${link.href}`
    // Append URL parameters if they exist
    if (urlParams !== undefined) {
        url = `${viyaUrl}${link.href}?${urlParams}`
    }
    // Execute the fetch request
    try {
        const response = await fetch(url, config)
        if (response.ok) {
            // Store CSRF token if present for later usage
            if (response.headers.get("x-csrf-token")) {
                csrfToken = response.headers.get("x-csrf-token")
            }
            // Transform the response into a JSON object
            const json = await response.json()
            // Return the response
            return json
        } else {
            // Generate error if the request failed
            throw new Error(`Call to ${link.href} failed with message: "${response.statusText}"`)
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error)
    }
    return null
}