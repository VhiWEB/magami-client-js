export interface Init {
    apiKey: string | undefined | any
    campaignSlug: string | undefined | any
}

export interface UserData {
    coupon_code?: string | any
    name?: string
    phone?: string | number
    province_id?: string | number
    city_id?: string | number
    district_id?: string | number | any
    id_number: string | number
    address: string
    email: string
}


export interface Winner extends UserData {
    redemption_id: string | number
}