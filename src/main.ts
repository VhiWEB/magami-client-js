import { coreApi } from "./helpers/api"
import { storeDataManagement } from "./utils/storage"

interface Init {
    appId?: string | undefined | any
    uniqueKey?: string | undefined | any
}

export default class Magami {

    private storage = storeDataManagement()

    private get appId() {
        return this.storage.getAppId()
    }

    private get uniqueKey() {
        return this.storage.getUniqueKey()
    }

    init({ appId, uniqueKey }: Init): void {
        this.storage.setAppId(appId)
        this.storage.setUniqueKey(uniqueKey)
    }

    private async apiCall(method: string, resource: string, body?: Record<string, unknown>) {
        // setup authorization for headers
        const encoded = btoa(`${this.appId}:${this.uniqueKey}`);
        const auth = `Basic ${encoded}`

        try {
            const response = await coreApi(method, resource, auth, body)
            if (response) {
                const data = await response.json()
                return data;
            }
        } catch (error) {
            return error
        }
    }

    async claim(couponCode: string) {
        try {
            const response = await this.apiCall('GET', `claim/${couponCode}`);
            if (response) {
                return response;
            } else {
                throw new Error;
            }
        } catch (error) {
            return error;
        }
    }
}