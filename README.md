# Steps of building up this project from scratch

0. Prepare environment
    1. install Node.js
    2. install expo
        ```sh
        npm install -g expo-cli
        ```
    3. install yarn
        ```sh
        npm install -g yarn
        ```

1. Setup empty project
   ```sh
   cd <SOURCE_ROOT>
   expo init . -t expo-template-blank-typescript
   yarn
   ```

   **NOTE:**
   - `<SOURCE_ROOT>` refers to the root folder of the source code, which is where this `README.md` file sits.

2. Install onnxruntime-react-native
    ```sh
    expo install onnxruntime-react-native@dev
    ```

3. Add your ONNX model to project

    1. Put the file under `<SOURCE_ROOT>/assets`.
    
       In this tutorial, we use the ORT format ONNX model of MNIST (`mnist.ort`).

    2. add a new file `metro.config.js` under `<SOURCE_ROOT>` and add the following lines to the file:
       ```js
       const { getDefaultConfig } = require('@expo/metro-config');
       const defaultConfig = getDefaultConfig(__dirname);
       defaultConfig.resolver.assetExts.push('ort');
       module.exports = defaultConfig;
       ```

       This step adds extension `ort` to the bundler's asset extension list, which allows the bundler to include the model into assets.

    **NOTE:**
    - There are multiple ways to load model using ONNX Runtime for React Native. In this tutorial, model is built into the app as an asset. See also [other tutorial][TBD]
    - It's required to use a ORT format model (ie. a model file with `.ort` extension). See also [links to ORT format model][TBD]

4. Setup Android and iOS project.

    In this step, we setup the generated Android/iOS project to consume ONNX Runtime. There are 2 ways to setup the project:

    - (recommended) using NPM package `onnxruntime-react-native` as an expo plugin.
        1. In `<SOURCE_ROOT>/app.json`, add the following line to section `expo`:
           ```
           "plugins": ["onnxruntime-react-native"],
           ```
        2. Run the following command in `<SOURCE_ROOT>` to generate Android and iOS project:
            ```sh
            expo prebuild
            ```

        The generated project files will be updated automatically.

    - setup manually.

        1. Run the following command in `<SOURCE_ROOT>` to generate Android and iOS project:
            ```sh
            expo prebuild
            ```

            **NOTE:**
            - Expo will ask the Android package name and iOS bundle identifier. In this tutorial we use `com.example.helloworld` as package name and bundle identifier.
            - The package name (Android) and bundle ID (iOS) will be added in your `<SOURCE_ROOT>/app.json` automatically by expo.

        2. Add `onnxruntime-react-native` to gradle depencencies.

            In `<SOURCE_ROOT>/android/app/build.gradle`, add the following line to section `dependencies`:
            ```
            implementation project(':onnxruntime-react-native')
            ```

        3. Add `onnxruntime-react-native` to CocoaPods dependencies.

            In `<SOURCE_ROOT>/ios/Podfile`, add the following line to section `target 'OrtReactNativeHelloWorld'`:
            ```
            pod 'onnxruntime-react-native', :path => '../node_modules/onnxruntime-react-native'
            ```

            Run the following command in `<SOURCE_ROOT>/ios` to install:
            ```sh
            pod install
            ```

5. Add code in `App.tsx` to use onnxruntime-react-native.

    Please refer to the file content for details.

6. Run the following command to launch:

    In `<SOURCE_ROOT>`, run the following command to launch for Android
    ```sh
    expo run:android
    ```

    In `<SOURCE_ROOT>`, run the following command to launch for iOS
    ```sh
    expo run:ios
    ```

