
export const coreApi = (method?: string, resource?: string, auth?: string, slug?: string, data?: Record<string, unknown>, apiURL?: string) => {

    let baseURL: any = new URL(`${apiURL}/${slug}/${resource}`)

    return fetch(`${baseURL}`, {
        method,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${auth}`,
        },
        body: data && JSON.stringify(data)
    });
}