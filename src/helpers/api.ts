export const coreApi = async <T>(
	method?: string,
	resource?: string,
	tenantKey?: string,
	slug?: string,
	data?: Record<string, unknown>,
	apiURL?: string,
	token?: string
): Promise<T> => {
	let baseURL: any = new URL(`${apiURL}/${slug}/${resource}`);
	try {
		const headers: Record<string, string> = {
			"content-type": "application/json",
		};

		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		if (tenantKey) {
			headers["Tenant-Key"] = `${tenantKey}`;
		}

		const response = await fetch(`${baseURL}`, {
			method,
			headers,
			body: data && JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`HTTP: Error status ${response.status}`, {
				cause: await response.json(),
			});
		} else {
			return (await response.json()) as Promise<T>;
		}
	} catch (error: any) {
		throw Error(error.cause.message);
	}
};

export const coreApiNoSlug = (
	method?: string,
	resource?: string,
	tenantKey?: string,
	data?: Record<string, unknown>,
	apiURL?: string,
	token?: string
) => {
	let baseURL: any = new URL(`${apiURL}/${resource}`);

	const headers: Record<string, string> = {
		"content-type": "application/json",
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	if (tenantKey) {
		headers["Tenant-Key"] = `${tenantKey}`;
	}

	return fetch(`${baseURL}`, {
		method,
		headers,
		body: data && JSON.stringify(data),
	});
};

export const coreApiBasicAuth = (
	method?: string,
	resource?: string,
	data?: Record<string, unknown>,
	uname?: string,
	pass?: string,
	apiURL?: string,
	tenantKey?: string,
	token?: string
) => {
	let baseURL: any = new URL(`${apiURL}/${resource}`);
	const cred = `${uname}:${pass}`;
	const encodedCredentials = btoa(cred);

	const headers: Record<string, string> = {
		"content-type": "application/json",
		Authorization: `Basic ${encodedCredentials}`,
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	if (tenantKey) {
		headers["Tenant-Key"] = `${tenantKey}`;
	}

	return fetch(`${baseURL}`, {
		method,
		headers,
		body: data && JSON.stringify(data),
	});
};
