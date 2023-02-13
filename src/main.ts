import { coreApi } from "./helpers/api"
import { storeDataManagement } from "./utils/storage"
import type { Init, UserData } from "./utils/model"

export default class Magami {

    private storage = storeDataManagement()

    private get apiKey() {
        return this.storage.getApiKey()
    }

    private get campaignSlug() {
        return this.storage.getCampaignSlug()
    }

    init({ apiKey, campaignSlug }: Init): void {
        this.storage.setApiKey(apiKey)
        this.storage.setCampaignSlug(campaignSlug)
    }

    setUserData({ name, phone, email, address }: UserData): void {
        const userData = { name, phone, email, address }
        this.storage.setUserData(userData)
    }

    private async apiCall(method: string, resource: string, body?: Record<string, unknown>) {
        // setup authorization for headers
        const auth = `${this.apiKey}`;
        const slug = this.campaignSlug;

        try {
            const response = await coreApi(method, resource, auth, slug, body)
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

    async userForm({ name, phone, email, address }: UserData): Promise<UserData | any> {
        const payload = { name, phone, email, address }
        try {
            const response = await this.apiCall('GET', ``, {
                payload
            })
            if (response) {
                this.setUserData({ ...payload })
                return response
            } else {
                throw new Error
            }
        } catch (error) {
            return error
        }
    }
}


// module.exports = {Roulette}
