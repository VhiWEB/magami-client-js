# Magami Client JS 
Welcome to Magami Software Development Kit (SDK), This library contains core API needed to create a mini game campaign. This developer-friendly resource empowers you to efficiently retrieve and manipulate data to create tailored solutions.
## Prerequisites
To use this package, you must have a registered Magami client application. Make sure you already have the `API Key` and `Campaign Slug`.
## Installation
You can install Magami Client JS using npm or yarn, depending on your preference. Open your terminal or command prompt and navigate to your project directory.

```bash
npm i magami-client-js
or if you are using yarn
yarn add magami-client-js
```
## Importing Magami Client JS
After successfully installing Magami Client JS, you can import it into your JavaScript or TypeScript code as follows:
```ts
import Magami from 'magami-client-js';
const magami = new Magami();
```
## Initalizing Magami 
To initialize Magami, you need to provide your `apiKey` and `campaignSlug`, which can be obtained from the Magami dashboard or by contacting Magami support. Use the `magami.init()` function for this purpose:
```ts
magami.init({
    apiKey: 'example',
    campaignSlug: 'example'
});
```
## Usage
Now that you have Magami Client JS installed and initialized, you can use its functions to interact with the Magami platform, including claiming coupons, setting user data, redeeming coupons, and more. Refer to the library's documentation or README for detailed information on how to use each function.
## Example
```ts
magami.claim('coupon_code_here')
    .then(response => {
        console.log('Coupon claimed successfully:', response);
    })
    .catch(error => {
        console.error('Error claiming coupon:', error);
    });
```
## Methods
### Claiming Coupon
To claim coupon from a campaign use `claim()` function.
```ts
magami.claim(coupon_code)
```
| Param       | Description  | Data Type  | Required  |
|-------------|--------------|------------|-----------|
| coupon_code | -            | String     | yes       |

### Welcome Form
To set user data from a user use `welcomeForm()`
```ts
welcomeForm({ coupon_code, name, phone, province_id, city_id, district_id })
```
| Param        | Description | Data Type | Required |
|--------------|-------------|-----------|----------|
| coupon_code  |             | String    | yes      |
| name         |             | String    | yes      |
| phone        |             | String    | yes      |
| province_id  |             | String    | yes      |
| city_id      |             | String    | yes      |
| district_id  |             | String    | yes      |

### Redeem
To redeem a coupon use `redeem()` function.
```ts
redeem(redemption_id)
```
| Param        | Description  | Data Type | Required |
|--------------|--------------|-----------|----------|
| redemption_id|              | String    | yes      |



### Validate Winner
Incase your user reload or close the page by some reason, you can re-validate your winner coupon code using `validateWinner()`.
```ts
validateWinner({ coupon_code, phone })
```
| Param       | Description | Data Type | Required |
|-------------|-------------|-----------|----------|
| coupon_code |             | String    | yes      |
| phone       |             | String    | yes      |


### Winner Form
To complete the user data after a user won a prize, you can use `winnerForm()` to complete their data.
```ts
winnerForm({ redemption_id, email,id_number, address})
```
| Param        | Description | Data Type | Required |
|--------------|-------------|-----------|----------|
| redemption_id|             | String    | yes      |
| email        |             | String    | yes      |
| id_number    |             | String    | yes      |
| address      |             | String    | yes      |


### Get Winner
To get list of winners you can use `getWinner()` function.
```ts
magami.getWinner()
```
### FAQ
To get list of all your Frequently Asked Question, use `faq()` function.
```ts
magami.faq()
// or you can pass a string into faq to filter faq data
magami.faq('your search')
```
| Param   | Description | Data Type | Required |
|---------|-------------|-----------|----------|
| keyword | -           | String    | no       |



