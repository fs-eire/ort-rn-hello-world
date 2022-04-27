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
   ```

   **NOTE:**
   - `<SOURCE_ROOT>` refers to the root folder of the source code, which is where this `README.md` file sits.

2. Install onnxruntime-react-native
    ```sh
    expo install onnxruntime-react-native
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


