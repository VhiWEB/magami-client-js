<div align="center">
  <h1>Magami Client JS</h1>
</div>

> :warning: **Note: Magami Client JS is still under development, and some function might be change.**

This library contains core functionalities needed to create a mini game campaign. 

## Installing
```bash
npm i magami-client-js

or if you are using yarn

yarn add magami-client-js
```
Then you need to import this library into your application.

```ts
import Magami from 'magami-client-js';
const magami = new Magami();
```

## Init using AppId 
To initialize the app use `magami.init()` all your `apiKey` and    `campaignSlug` would be found on our magami website or please contact us.

```ts
magami.init({
    apiKey: 'example',
    campaignSlug: 'example'
});

```
## Claiming Coupon
To claim coupon from a campaign use `claim()` function.
```ts
magami.claim(coupon_code)
```

## Welcome Form
To set user data from a user use `welcomeForm()`
```ts
magami.welcomeForm({
    coupon_code: 'example'
    name: 'example',
    phone: 0,
    province_id: 'example',
    district_id: 'example'
})
```

## Redeem
To redeem a coupon use `redeem()` function.
```ts
magami.redeem(redemption_id)
```

## validate winner
Incase your user reload or close the page by some reason, you can validate your winner coupon code using `validateWinner()`.
```ts
magami.validateWinner({
    coupon_code: 'example'
    phone: 082...
})
```

## winnerForm
To complete the user data after a user won a prize, you can use `winnerForm()` to complete their data.
```ts
magami.winnerForm({
    redemption_id: 'example',
    email:'email@example.com',
    id_number: 234232342342,
    address: 'address example'
})
```

## getWinner
To get list of winners you can use `getWinner()` function.
```ts
magami.getWinner()
```
## faq
To get list of all your Frequently Asked Question, use `faq()` function.
```ts

magami.faq()

// or you can pass a string into faq to filter faq data

magami.faq('your search')
```

