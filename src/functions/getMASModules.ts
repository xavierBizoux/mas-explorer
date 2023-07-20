import { ApiParameters, Link } from "../interfaces/api"
import { ModulesList } from "../interfaces/modules"
import { callViyaApi } from "./callViyaApi"

// Function to retrieve the list of models
export const getMASModules = async (params: ApiParameters) => {
  // Generate a link to retrieve the list of models
  const link: Link = {
    "method": "GET",
    "rel": "self",
    "href": "/microanalyticScore/modules",
    "type": "application/vnd.sas.collection"
  }
  // Call the REST API with the link
  const response = await callViyaApi(link, params)
  // Return the response
  return response as ModulesList
}