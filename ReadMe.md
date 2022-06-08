# Assignment Project

## Install

```sh
yarn install
npx pod-install
yarn ios #run ios
yarn android #run android
```

## Brownie Points

- API services Instant handle all APIs in the app. You can track api status by call useError('apiName'), you will receive object {code, message} that let you know api status is 'loading' | 200 | errorCode ....
- Account/Pin info was stored in keychain/share preference
- Combine redux/redux-toolkit/redux-saga perfectly, redux implementing is very simple, support full typescript.
- Localization with i18next & react-i18next.
- Auto generate images definition in src/themes/Images.ts when add more images to src/assets/image with a script. Just run <i>yarn img</i> after drop images to that folder.
- Alias path with regex so we don't need define for each folder.
- Switch between dark/light color mode.

## Summary

Because the time spent on this project is quite limited, I did not go through the login and pin code more closely. With the real project, I will have time to study more closely the pincode module to use it most effectively.

This project I also continue from the previous biometric demo, I apologize and hope for your understanding.

## Author

Le Van Vinh
