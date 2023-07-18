import { ApiParameters, Link } from "../interfaces/api"
import { ModulesList } from "../interfaces/modules"
import { callViyaApi } from "./callViyaApi"

export const getMASModules = async (params: ApiParameters) => {
  const link: Link = {
    "method": "GET",
    "rel": "self",
    "href": "/microanalyticScore/modules",
    "type": "application/vnd.sas.collection"
  }
  const response = await callViyaApi(link, params)
  return response as ModulesList
}