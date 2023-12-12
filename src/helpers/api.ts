

export const coreApi = async <T>(method?: string, resource?: string, auth?: string, slug?: string, data?: Record<string, unknown>, apiURL?: string): Promise<T> => {
    let baseURL: any = new URL(`${apiURL}/${slug}/${resource}`)
    try {
        const response = await fetch(`${baseURL}`, {
            method,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${auth}`,
            },
            body: data && JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error(`HTTP: Error status ${response.status}`, {
                cause: await response.json()
            })
        } else {
            return await response.json() as Promise<T>;
        }
    } catch (error: any) {
        throw Error(error.cause.message)
    }
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