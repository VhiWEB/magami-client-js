import { coreApi, coreApiBasicAuth, coreApiNoSlug } from "./helpers/api";
import { storeDataManagement } from "./utils/storage";
import * as model from "./utils/model";

export default class Magami {
	private storage = storeDataManagement();

	protected apiURL = `https://app.magami.id/api/v1`;

	private get apiKey() {
		return this.storage.getApiKey();
	}

	private get campaignSlug() {
		return this.storage.getCampaignSlug();
	}

	init({ apiKey, campaignSlug }: model.Init): void {
		this.storage.setApiKey(apiKey);
		this.storage.setCampaignSlug(campaignSlug);
	}

	// setup authorization for headers
	private async apiCall(
		method: string,
		resource: string,
		body?: Record<string, unknown>
	): Promise<any> {
		const auth = this.apiKey;
		const slug = this.campaignSlug;
		try {
			const response = await coreApi(
				method,
				resource,
				auth,
				slug,
				body,
				this.apiURL
			);
			if (response) {
				return response;
			}
		} catch (error: any) {
			throw Error(error);
		}
	}
	private async apiCalNoSlug(
		method: string,
		resource: string,
		body?: Record<string, unknown>
	) {
		const auth = this.apiKey;
		try {
			const response = await coreApiNoSlug(
				method,
				resource,
				auth,
				body,
				this.apiURL
			);
			if (response) {
				const data = await response.json();
				return data;
			}
		} catch (error: any) {
			throw Error(error);
		}
	}

	private async apiCallBasic(
		method: string,
		resource: string,
		username: string,
		password: string,
		body?: Record<string, unknown>
	) {
		try {
			const response = await coreApiBasicAuth(
				method,
				resource,
				body,
				username,
				password,
				this.apiURL
			);
			if (response) {
				const data = await response.json();
				return data;
			}
		} catch (error: any) {
			throw Error(error);
		}
	}

	async claim(couponCode: string) {
		try {
			const response = await this.apiCall("GET", `check/${couponCode}`);
			if (response) {
				this.storage.setCouponCode(couponCode);
				return response;
			} else {
				throw new Error();
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
		district_id,
	}: {
		coupon_code: string;
		name: string;
		phone: string | number;
		province_id: string | number;
		city_id: string | number;
		district_id: string | number;
	}) {
		const payload = {
			name,
			phone,
			province_id,
			city_id,
			district_id,
		};
		try {
			const response: any = await this.apiCall(
				"POST",
				`welcome/submit/${coupon_code}`,
				{
					...payload,
				}
			);

			if (response) {
				return response;
			} else {
				throw new Error();
			}
		} catch (error) {
			return error;
		}
	}

	async redeem(redemptionId: string) {
		try {
			const response = await this.apiCall(
				"GET",
				`redeem/${redemptionId}`
			);

			if (response) {
				return response;
			} else {
				throw new Error();
			}
		} catch (error) {
			return error;
		}
	}

	async rewards() {
		try {
			const response = await this.apiCall("GET", `rewards`);

			if (response) {
				return response;
			} else {
				throw new Error();
			}
		} catch (error) {
			return error;
		}
	}

	async validateWinner({
		coupon_code,
		phone,
	}: {
		coupon_code: string;
		phone: string | number;
	}) {
		try {
			const response = await this.apiCall("POST", `winner/validate`, {
				coupon_code,
				phone,
			});

			if (response) {
				return response;
			}
		} catch (error) {
			return error;
		}
	}

	async winnerForm({
		redemption_id,
		email,
		id_number,
		address,
		...additionalProps
	}: {
		redemption_id: string | number;
		email: string;
		id_number: string | number;
		address?: string;
		[key: string]: any;
	}): Promise<any> {
		try {
			const response = await this.apiCall(
				"POST",
				`winner/submit/${redemption_id}`,
				{
					email,
					id_number,
					address,
					...additionalProps,
				}
			);

			if (response) {
				return response;
			}
		} catch (error) {
			return error;
		}
	}

	async getWinner(): Promise<any> {
		try {
			const response = await this.apiCall("GET", `winner/list`);

			if (response) {
				return response;
			}
		} catch (error) {
			return error;
		}
	}

	async faq(searchKey?: string | number | any): Promise<any> {
		try {
			const reqUrl = `faq`;

			searchKey && reqUrl.concat(`?search=${searchKey}`);

			const response = await this.apiCall("POST", `${reqUrl}`);

			if (response) {
				return response;
			}
		} catch (error) {
			return error;
		}
	}

	async getProvince(): Promise<any> {
		try {
			const response = await this.apiCalNoSlug(
				"GET",
				"locations/provinces"
			);

			if (response) {
				return response;
			}
		} catch (error) {
			return error;
		}
	}

	async getCities(provinceId: number | string): Promise<any> {
		try {
			const response = await this.apiCalNoSlug(
				"GET",
				`locations/cities/${provinceId}`
			);

			if (response) {
				return response;
			}
		} catch (error) {
			return error;
		}
	}

	async getDistrict(cityId: number | string): Promise<any> {
		try {
			const response = await this.apiCalNoSlug(
				"GET",
				`locations/districts/${cityId}`
			);

			if (response) {
				return response;
			}
		} catch (error) {
			return error;
		}
	}

	async getLeaderboard(type: string) {
		try {
			const response = await this.apiCall("GET", `leaderboard/${type}`);

			if (response) {
				return response;
			}
		} catch (error) {
			return error;
		}
	}

	async getConfiguration(host: string, username: string, password: string) {
		try {
			const response = await this.apiCallBasic(
				"GET",
				`tenant/${host}`,
				username,
				password
			);
			if (response) {
				return response;
			}
		} catch (error) {
			return error;
		}
	}

	async validateSignature(signature: string) {
		try {
			const request: any = await this.apiCall(
				"GET",
				`session/validate/${signature}`
			);
			if (request) {
				return request;
			}
		} catch (error: any) {
			return error;
		}
	}
}
