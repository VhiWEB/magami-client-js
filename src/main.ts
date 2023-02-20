import { coreApi } from "./helpers/api"
import { storeDataManagement } from "./utils/storage"
import type { Init, UserData, Winner } from "./utils/model"

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
        const auth = this.apiKey;
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
        coupon_code,
        name,
        phone,
        province_id,
        city_id,
        district_id }: UserData): Promise<UserData | any> {
        const payload = {
            coupon_code,
            name,
            phone,
            province_id,
            city_id,
            district_id
        }
        try {
            const response = await this.apiCall('POST', `campaigns/${this.campaignSlug}/welcome/submit`, {
                ...payload
            })

            if (response) {
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

            const response = await this.apiCall('GET', `campaigns/${this.campaignSlug}/redeem/${redemptionId}`)

            if (response) {
                return response
            } else {
                throw new Error;

            }

        } catch (error) {
            return error
        }
    }

    async validateWinner({ coupon_code, phone }: UserData) {
        try {
            const response = await this.apiCall('POST', `campaigns/${this.campaignSlug}/winner/validate`, {
                coupon_code,
                phone,
            })

            if (response) {
                return response
            }

        } catch (error) {
            return error
        }
    }

    async winnerForm({ redemption_id, email, id_number, address }: Winner) {
        try {
            const response = await this.apiCall('POST', `campaigns/${this.campaignSlug}/winner/submit`, {
                redemption_id,
                email,
                id_number,
                address
            })

            if (response) {
                return response
            }

        } catch (error) {
            return error
        }
    }

    async getWinner() {
        try {

            const response = await this.apiCall('GET', `campaigns/${this.campaignSlug}/winner/list`,)

            if (response) {
                return response
            }

        } catch (error) {
            return error
        }
    }

    async faq(searchKey?: string | number | any) {
        try {
            const reqUrl = `campaigns/${this.campaignSlug}/faq`

            searchKey && reqUrl.concat(`?search=${searchKey}`)

            const response = await this.apiCall('POST', `${reqUrl}`)

            if (response) {
                return response
            }

        } catch (error) {
            return error
        }
    }
}