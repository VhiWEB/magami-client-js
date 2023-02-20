# Magami client js 

This library contains core functionalities needed to create a mini game campaign. 

## Installing

```
$ npm i magami-client-js
// or if you're using yarn
$ yarn add magami-client-js
```

then you need to import this library into your application.

```
import Magami from 'magami-client-js';

const magami = new Magami();
```

## Init using AppId 

```
magami.init({
    apiKey: 'example',
    campaignSlug: 'example'
});
```
## claiming coupon
```
example
magami.claim(coupon_code)
```
## welcome form
```
example
magami.welcomeForm({
    coupon_code: 'example'
    name: 'example',
    phone: 0,
    province_id: 'example',
    district_id: 'example'
})
```

## Redeem
```
example
magami.welcomeForm(redemption_id)
```

## validate winner
```
example
magami.validateWinner({
    coupon_code: 'example'
    phone: 082...
})
```

## winnerForm
```
example
magami.winnerForm({
    redemption_id: 'example',
    email:'email@example.com',
    id_number: 234232342342,
    address: 'address example'
})
```

## getWinner
```
example
magami.getWinner()
```
## faq
```
example
magami.faq()

options
you can search FAQ by passing string to FAQ method

example
magami.faq('your search')
```

