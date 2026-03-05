import { Image } from 'expo-image';
import { ImageSourcePropType, StyleSheet } from 'react-native';

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return <Image source={imageSource} style={styles.image} />;
}

// this changes the image shape and location on page
// is now round for profile picture
// this should stay almost constant while you play
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 1000,
    marginTop: 100,
  },
});

