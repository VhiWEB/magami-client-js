
export const coreApi = (method?: string, resource?: string, auth?: string, slug?: string, data?: Record<string, unknown>, apiURL?: string) => {

    console.log(apiURL)
    let baseURL: any = new URL(`${apiURL}/campaigns/${slug}/${resource}`)

    return fetch(`${baseURL}`, {
        method,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${auth}`,
        },
        body: data && JSON.stringify(data)
    });
}


export const coreApiNoSlug = (method?: string, resource?: string, auth?: string, data?: Record<string, unknown>, apiURL?: string) => {

    let baseURL: any = new URL(`${apiURL}/${resource}`)

    return fetch(`${baseURL}`, {
        method,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${auth}`,
        },
        body: data && JSON.stringify(data)
    });
}