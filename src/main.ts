import { coreApi } from "./helpers/api";
import { } from "./utils/storage";

interface Init {
    appId?: string | undefined | any
    userName?: string | undefined | any
    uniqueKey?: string | undefined | any
}

export default class Magami {

    init({ appId, userName, uniqueKey }: Init): void {
        localStorage.setItem('appId', appId)
        localStorage.setItem('userName', userName)
        localStorage.setItem('uniqueKey', uniqueKey)
    }

    async claim(couponCode: string) {
        try {
            const response = await coreApi('GET', `/${couponCode}`)
            if (response) {
                return await response.json()
            }
        } catch (error) {
            throw new Error()
        }
    }
}