
export const coreApi = (method?: string, resource?: string, authKey?: string, data?: Record<string, unknown>) => {
    const baseURL = 'http://bihunku-be.embrio.id/api'
    return fetch(`${baseURL}/${resource}`, {
        method,
        headers: {
            'content-type': 'application/json',
            'Authorization': `${authKey}`,
        },
        body: data && JSON.stringify(data)
    });
}