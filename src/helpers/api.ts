
const encoded = btoa(`${import.meta.env.VITE_USER}:${import.meta.env.VITE_PAS}`);
const auth = `Basic ${encoded}`
const base = import.meta.env.VITE_END_POINT;

export function api(method: string, resource: string, data?: Record<string, unknown>) {
    return fetch(`${base}/${resource}`, {
        method,
        headers: {
            'content-type': 'application/json',
            'Authorization': `${auth}`,
        },
        body: data && JSON.stringify(data)
    });
}