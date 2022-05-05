import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

import * as ort from 'onnxruntime-react-native';
import { Asset } from 'expo-asset';

let myModel: ort.InferenceSession;

async function loadModel() {
  try {
    const assets = await Asset.loadAsync(require('./assets/mnist.ort'));
    const modelUri = assets[0].localUri;
    if (!modelUri) {
      Alert.alert('failed to get model URI', `${assets[0]}`);
    } else {
      myModel = await ort.InferenceSession.create(modelUri);
      Alert.alert(
        'model loaded successfully',
        `input names: ${myModel.inputNames}, output names: ${myModel.outputNames}`);
    }
  } catch (e) {
    Alert.alert('failed to load model', `${e}`);
    throw e;
  }
}

async function runModel() {
  try {
    const input0 = new Float32Array(28*28);
    const feeds:Record<string, ort.Tensor> = {};

    // this is the wrong dimension for input.
    // the correct dim should be [1,28,28].
    // the expected behavior for ORT is to throw the exception, however it crashes.
    feeds[myModel.inputNames[0]] = new ort.Tensor(input0, [1,1,28,28]);
    const results = await myModel.run(feeds);
    Alert.alert(
      'model run successfully',
      `results: ${results}`);
  } catch (e) {
    Alert.alert('failed to run model', `${e}`);
    throw e;
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>using ONNX Runtime for React Native</Text>
      <Button title='Load model' onPress={loadModel}></Button>
      <Button title='Run' onPress={runModel}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
