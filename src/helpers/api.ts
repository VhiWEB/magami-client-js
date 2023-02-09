import { storage } from "../utils/storage";

export const coreApi = (method?: string, resource?: string, data?: Record<string, unknown>) => {
    const baseURL = 'magami'
    return fetch(`${baseURL}/${resource}`, {
        method,
        headers: {
            'content-type': 'application/json',
            'appId': `${storage.appId}`,
        },
        body: data && JSON.stringify(data)
    });
}