# Qiscus Web SDK Core

This library contains core functionalities needed to create a chat application using qiscus. 

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
    AppId: 'example',
    userName: 'example',
    uniqueKey: 'example'
});
```
