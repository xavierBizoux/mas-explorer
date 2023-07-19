import { CookieAuthenticationCredential } from "@sassoftware/sas-auth-browser"
import { viyaUrl } from "../const"
import { ApiParameters, ApiResponse, Link } from "../interfaces/api"

let csrfToken: string | null = null
const sasInstance = new CookieAuthenticationCredential({ url: viyaUrl })

export const callViyaApi = async (link: Link, params ?: ApiParameters): Promise<ApiResponse | null> => {
    try {
        await sasInstance.checkAuthenticated()
    } catch {
        await sasInstance.loginPopup()
    }
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
    const config: RequestInit = {
        credentials: "include",
        headers: headers,
        method: link.method,
    }
    if (params?.data !== undefined) {
        config.body = params.data
    }
    const urlParams = new URLSearchParams()
    if (params?.limit !== undefined) {
        urlParams.set("limit", params.limit.toString())
    }
    if (params?.filter !== undefined) {
        urlParams.set("filter", params.filter)
    }
    let url = `${viyaUrl}${link.href}`
    if (urlParams !== undefined) {
        url = `${viyaUrl}${link.href}?${urlParams}`
    }
    try {
        const response = await fetch(url, config)
        if (response.ok) {
            if (response.headers.get("x-csrf-token")) {
                csrfToken = response.headers.get("x-csrf-token")
            }
            const json = await response.json()
            return json
        } else {
            throw new Error(`Call to ${link.href} failed with message: "${response.statusText}"`)
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error)
    }
    return null
}