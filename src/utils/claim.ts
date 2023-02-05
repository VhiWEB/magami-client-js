import { api } from "~/helpers/api"

interface Coupon {
    code: string
}

export const Claim = (async (code: Coupon) => {
    try {
        const response = await api('POST', `/`, {
            code,
        })
        if (response) {
            return await response.json()
        } else {
            throw new Error("Something goes wrong");

        }
    } catch (error) {
        return error
    }
}) 