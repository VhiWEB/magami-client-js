
export const coreApi = (method?: string, resource?: string, auth?: string, slug?: string, data?: Record<string, unknown>) => {
    const baseURL = `http://app.magami.id/api/v1/campaigns/${slug}`
    return fetch(`${baseURL}/${resource}`, {
        method,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${auth}`,
        },
        body: data && JSON.stringify(data)
    });
}