export interface ApiResponse {
    name: string
    count: number
    items: Item[]
    links: Link[]
    limit: number
    start: number
    version: number
    accept?: string
}

export interface Link {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    rel: string
    uri?: string
    href?: string
    title?: string
    type?: string
    itemType?: string
    responseType?: string
    responseItemType?: string
}

export interface Item {
    createdBy: string
    creationTimeStamp: string
    id: string
    links: Link[]
    modifiedBy: string
    modifiedTimeStamp: string
    version: number
}

export interface ApiParameters {
    data?: string
    start?: number
    limit?: number
    filter?: string
}