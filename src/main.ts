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

    // setup authorization for headers
    private async apiCall(method: string, resource: string, body?: Record<string, unknown>) {
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
                this.storage.setCouponCode(couponCode)
                return response;
            } else {
                throw new Error;
            }
        } catch (error) {
            return error;
        }
    }

    async welcomeForm({
        name,
        phone,
        province_id,
        city_id,
        district_id }: UserData): Promise<UserData | any> {
        const payload = {
            coupon_code: this.storage.getCouponCode(),
            name,
            phone,
            province_id,
            city_id,
            district_id
        }
        try {
            const response = await this.apiCall('GET', `campaigns/${this.campaignSlug}/welcome/submit`, {
                ...payload
            })

            if (response) {
                this.storage.setUserData(payload)

                return response
            } else {
                throw new Error
            }
        } catch (error) {
            return error
        }
    }

    async redeem(redemptionId: string) {
        try {
            const response = await this.apiCall('GET', `campaigns/${this.campaignSlug}/redeem/${redemptionId}`, {
                campaignSlug: this.campaignSlug,
                redemptionId: redemptionId
            })

            if (response) {
                return response
            } else {
                throw new Error;

            }

        } catch (error) {
            return error
        }
    }

    async ValidateWinner(couponCode: string, phone: number | string) {
        try {
            const response = await this.apiCall('GET', `/campaigns/${this.campaignSlug}/winner/validate`, {
                couponCode,
                phone,
            })

            if (response) {
                return response
            }

        } catch (error) {
            return error
        }
    }
}
