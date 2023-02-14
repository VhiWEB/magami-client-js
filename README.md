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
const request = async(coupon_code: string) => {
    try {
        const response = await magami.claim(coupon_code)
        if (response) {
            return response
        }
    } catch (error) {
        return error
    }
}
