import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'


import { Button, Header } from './components'
import redux from './redux.js'


const App = () => {
  const dispatch = useDispatch()
  const [ caption, setCaption ] = useState(null)
  const [ image, setImage ] = useState(null)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const uploadImage = () => {
    // start client-side validation
    /* comment out the below block to test server validation */
    if (!image) {
      alert('Please upload an image')
      return
    } else if (!caption) {
      alert('Please add a caption')
      return
    }
    // end client-side validation

    axios.post('http://localhost:3000/upload', { image, caption })
      .then(function (response) {
        // console.log('response', response)
        /* this will add the image and caption to redux state for use in something
        like a favorites list or history list */
        dispatch({ type: 'ADD_IMAGE', image, caption })
        alert('Image uploaded successfully')

      })
      .catch(function (error) {
        // console.log('error', error)
        alert('Image failed to upload')
      })
  }

  return (
    <Provider store={redux.store}>
      <PersistGate loading={null} persistor={redux.persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Header title="Image Uploader" />
            <View style={styles.imagePicker}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                />
              )}
              <Button title="Choose Image" onPress={pickImage} />
            </View>
            <TextInput
              style={styles.caption}
              placeholder="Enter caption here"
              value={caption}
              onChangeText={setCaption}
            />
            <Button title="Upload Image" onPress={uploadImage} />
            <StatusBar style="auto" />
          </View>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  caption: {
    width: '50%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    height: 200,
    width: 200,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
