import * as React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';

export default function TabOneScreen() {
  const [selectedImage, setSelectedImage] = React.useState({localUri: ''});

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult : ImagePicker.ImagePickerResult
    pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log('pickerResult', pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Text>Pick a photo</Text>
      </TouchableOpacity>
      {selectedImage && <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
      />}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
