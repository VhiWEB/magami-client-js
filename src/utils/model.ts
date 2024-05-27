export interface Init {
    apiKey: string
    campaignSlug: string
    userTokenSSo: string
}

export interface UserData {
    coupon_code?: string
    name?: string
    phone?: string | number
    province_id?: string | number
    city_id?: string | number
    district_id?: string | number
    id_number: string | number
    address: string
    email: string
}


export interface Winner extends UserData {
    redemption_id: string | number
}