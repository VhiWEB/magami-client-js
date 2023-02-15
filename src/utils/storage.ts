import type { UserData } from "./model"


export const storeDataManagement = () => {
    const store: Record<string, any> = {}

    const Setter = <T>(name: string) => {
        return (value: T): void => {
            store[name] = value
        }
    }

    const Getter = <T>(name: string, defaultVal?: T) => {
        return (): T => {
            return store[name] ?? defaultVal
        }
    }

    return ({
        // initialinze
        getApiKey: Getter<string>('appId'),
        setApiKey: Setter<string>('appId'),
        getCampaignSlug: Getter<string>('uniqueKey'),
        setCampaignSlug: Setter<string>('uniqueKey'),

        // user information
        setUserData: Setter<UserData>('userData'),
        getUserData: Getter<UserData>('userData'),

        //set coupon code
        setCouponCode: Setter<string>('couponCode'),
        getCouponCode: Getter<string>('couponCode')

    })
}
