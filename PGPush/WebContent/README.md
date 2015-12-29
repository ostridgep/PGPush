## PhoneGap Push
A sample application demonstrating how to setup and receive push notifications on the Kinvey platform.

### Setup
__iOS__
 
When using Apple Push Notification service (APNS) you will get two push certificates; one for development and one for production/ad-hoc. These certificates require push notifications to be sent to different servers depending on if your app is in development or production.

The production certificate is only usable if your app is in the App Store.

1. Generate an Apple Push Certificate .p12 file for your app ([instructions](http://docs.aws.amazon.com/sns/latest/dg/mobile-push-apns.html#private-key-apns)).
2. After you export the .p12 file, on the [Kinvey's console](http://console.kinvey.com) navigate to **Engagement** and select **Push**.
3. Select **Configuration** from the top.
4. In the **iOS** section drag your .p12 file generated in step 1 where it says `DRAG FILES HERE`.
5. Click **Save iOS**
6. When you are ready to deploy your app, use your production/ad-hoc certificate. Export the .p12 file, and upload that to our service. Then select **production** as the certificate type and click **Save iOS**. Deploying your application is a one-time action and cannot be undone.

__Android__

1. Navigate to the [Google Mobile Services Add Service Wizard](https://developers.google.com/mobile/add) and follow the the instructions for creating a project, entering in your app info and adding `Google Cloud Messaging` to your app.  Write down the `Server API Key` and `Sender ID` obtained.
2. On the [Kinvey's console](http://console.kinvey.com) navigate to **Engagement** and select **Push**.
3. Select **Configuration** from the top.
4. In the **Android** section, enter the **API Key** and **Sender ID** (also known as **Project Number**) obtained in step 1. 
5. Click **Save Android**

### Install

1. Install NodeJS. Please visit https://nodejs.org/.
2. Install PhoneGap CLI wtih `npm install -g phonegap`. (Optionally install ios-deply with `npm install -g ios-deploy` if you will run the application on an iOS device.)
3. Run `npm install` to install dependencies and setup the project.

**Note:** Mac OS X with Xcode installed is required to run the application on the iOS platform. Please visit https://developer.apple.com/.

**Note:** The Android SDK is required to be installed to run the application on the Android platform. Please see http://developer.android.com/index.html.

### Run

Execute `phonegap run ios --device` to run the project on an iOS device. You will have to install [ios-deploy](https://github.com/phonegap/ios-deploy#installation) to deploy it to your device.

*or*  

Execute `phonegap run android --device` to run the project on an Android device.

### Test 

From the 'Engagement' section of your application environment at https://console.kinvey.com, send a test message to your device.

### Business Logic

You can send targetted or conditional push notifications by writing business logic. The __businesslogic__ folder contains 4 javascript files, one for each of the four types of business logic push we support.  To use a script, create a custom endpoint and copy and paste the JS into it.

When executing the `Targetted*` scripts, change the username in the query to match the specific platform you are testing.  You can Execute these custom endpoints through the Console itself, so there is no need to write code to hit them.

### Troubleshooting

__Why won't the application install onto my iOS device?__  

1. Make sure you have installed `ios-deply` by executing `npm install -g ios-deply`. Follow the installation instructions at [ios-deploy installtion](https://github.com/phonegap/ios-deploy#installation). Try `phonegap run ios --device` again.

2. Refresh your account information in Xcode. Open Xcode and select Xcode > Preferences from the menu bar. Click on the Accounts tab. Select the account that you used to create your .p12 certificate and click view details in the bottom right hand corner. Click the circular arrow button in the left hand corner to refresh your provisioning profiles. Try `phonegap run ios --device` again.

3. Add your iOS device to your Apple Developer account. Visit https://developer.apple.com/account/ios/device/deviceList.action. Click the plus button in the top right hand corner. Give your device a name and enter its UUID. You can find the device UUID using iTunes (http://www.macworld.co.uk/how-to/iphone/how-find-out-your-iphone-or-ipad-udid-3530239/). Click continue and done. Try `phonegap run ios --device` again.   

__I am not receiving push notifications on my device__

1. Make sure you uploaded the .p12 certificate you created with your Apple Developer account into the Kinvey Management Console for your application. See the instructions above on how to setup push notifications for iOS.

2. Make sure your `Sender Id` and `API Key` are correct for your Android configuration. See the instructions above on how to setup push notifications for Android.


