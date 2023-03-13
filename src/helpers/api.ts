
export const coreApi = (method?: string, resource?: string, auth?: string, slug?: string, data?: Record<string, unknown>,) => {

    //prod api
    // let baseURL: any = new URL(`http://app.magami.id/api/v1/campaigns/${slug}/${resource}`)

    //stg api
    let baseURL: any = new URL(`https://demo.magami.id/api/v1/campaigns/${slug}/${resource}`)



    return fetch(`${baseURL}`, {
        method,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${auth}`,
        },
        body: data && JSON.stringify(data)
    });
}