import { api } from "./helpers/api";
import { hello } from "./utils/hello";

export { hello }

// interface Coupon {
//     data?: any,
// }

interface UserData {
    name?: string,
    id?: number,
    phone?: number,
    address?: string,
    email?: string,
}

export default class Magami {
    // private static _instance = Magami;

    async claimCupoun(couponCode: string | number) {
        try {
            const response = api('POST', `${couponCode}`)
            if (response) {
                return (await response).json()
            }
        } catch (error) {
            throw new Error;
        }
    }

    async play(payload: UserData) {
        try {
            const response = api('POST', `/`, {
                payload,
            })
            if (response) {
                return (await response).json()
            }
        } catch (error) {
            throw new Error;
        }
    }

}