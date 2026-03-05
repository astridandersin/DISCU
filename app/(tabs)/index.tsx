import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';

// elements required to build front page
import Button from '@/components/Button Blue';
import Button2 from '@/components/Button Green';
import CircleButton from '@/components/CircleButton';
import EmojiList from '@/components/EmojiList';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiSticker from '@/components/EmojiSticker';
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/ProfilePicture';
import Box from '@/components/White Box';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const PlaceholderImage = require('./assets/images/background-image.png'); // image first visible when opening app

// Constants
export default function App() { // Renamed from Index to App for common React Native practice
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  // showAppOptions determines if the reset/save buttons are shown for image editing
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  // State to control visibility for "Join a Discussion" mode
  const [isInJoinDiscussionMode, setIsInJoinDiscussionMode] = useState<boolean>(false);
  // NEW State to control visibility for "Start a new Discussion" mode
  const [isInStartDiscussionMode, setIsInStartDiscussionMode] = useState<boolean>(false);


  /**
   * @brief Launches the image library to pick a new image.
   * This function allows the user to select an image from their device's photo library.
   * If an image is selected, it updates the `selectedImage` state and shows the app options.
   * If no image is selected, it displays an alert message.
   */
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // Restrict to images only
      allowsEditing: true,    // Allow basic editing like cropping
      quality: 1,             // Max quality
    });

    if (!result.canceled) {
      // If an image was selected, update the state and show app options
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      // Ensure other modes are off when entering image editing mode
      setIsInJoinDiscussionMode(false);
      setIsInStartDiscussionMode(false);
    } else {
      // If no image was selected, inform the user
      alert('You did not select any image.');
    }
  };


  /**
   * @brief Resets the app to its initial state.
   * This function clears the selected image and any picked emojis,
   * hides all mode-specific options, returning to the initial discussion buttons.
   */
  const onReset = () => {
    setShowAppOptions(false);     // Hide options, show discussion buttons initially
    setSelectedImage(undefined);  // Clear selected image
    setPickedEmoji(undefined);    // Clear picked emoji
    setIsInJoinDiscussionMode(false); // Exit the "join discussion" mode
    setIsInStartDiscussionMode(false); // Exit the "start discussion" mode
  };

  /**
   * @brief Displays the emoji picker modal.
   * This function sets `isModalVisible` to true, making the `EmojiPicker` component visible.
   */
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  /**
   * @brief Closes the emoji picker modal.
   * This function sets `isModalVisible` to false, hiding the `EmojiPicker` component.
   */
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  /**
   * @brief Placeholder function for saving the image.
   * This function will contain the logic to save the edited image (with stickers)
   * to the device or upload it. Currently, it does nothing.
   */
  const onSaveImageAsync = async () => {
    // Implementation for saving the image will go here later
    console.log("Save image functionality not yet implemented.");
  };


  return (
    <GestureHandlerRootView style={styles.container}>
      {isInJoinDiscussionMode ? (
        // When in "Join Discussion" mode, show the waiting message and Reset button
        <View style={styles.container}>
          <View style={styles.topContainer}>
              <Box theme="primary" label="Wait for others to join the discussion." />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
          </View>
        </View>
      ) : isInStartDiscussionMode ? (
        // NEW: When in "Start Discussion" mode, show a different message and Reset button
        <View style={styles.container}>
          <View style={styles.topContainer}>
              <Box theme="primary" label="Prepare your discussion details." />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
          </View>
        </View>
      ) : (
        // Otherwise, show the normal app content (default or image editing)
        <View style={styles.container}>
          <View style={styles.topContainer}>
              <Box theme="primary" label="Start a new discussion or join one by using the created pin." />
          </View>

          <View style={styles.imageContainer}>
            <Pressable onPress={pickImageAsync}>
                <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
            </Pressable>
            {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
          </View>

          {showAppOptions ? (
            // Options for resetting, adding stickers, and saving (after image picked)
            <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                <IconButton icon="refresh" label="Reset" onPress={onReset} />
                <CircleButton onPress={onAddSticker} />
                <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
              </View>
            </View>
          ) : (
            // Initial discussion buttons
            <View style={styles.footerContainer}>
              {/* "Join a DISCUssion" button now triggers "isInJoinDiscussionMode" */}
              <Button theme="primary" label="Join a DISCUssion" onPress={() => setIsInJoinDiscussionMode(true)} />
              {/* "Start a new DISCUssion" button now triggers "isInStartDiscussionMode" */}
              <Button2 theme="primary" label="Start a new DISCUssion" onPress={() => setIsInStartDiscussionMode(true)} />
            </View>
          )}

          <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
            <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
          </EmojiPicker>
        </View>
      )}
    </GestureHandlerRootView>
  );
}


// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Dark background for the whole screen
    alignItems: 'center',       // Center content horizontally
    justifyContent: 'center', // Center content vertically in the main container
  },
  imageContainer: {
    flex: 1, // Takes up available space
    paddingTop: 1, // Padding from the top
  },
  footerContainer: {
    flex: 1 / 3,          // Takes up a third of the screen space
    alignItems: 'center', // Center items horizontally within the footer
    marginBottom: 100,    // Margin at the bottom
  },
  optionsContainer: {
    position: 'absolute', // Position absolutely at the bottom
    bottom: 100,
  },
  optionsRow: {
    alignItems: 'center',    // Center items horizontally
    flexDirection: 'row',    // Arrange items in a row
  },
  topContainer: {
    alignItems: 'center', // Center content horizontally
  },
  centeredContainer: { // New style to center the reset button when in join discussion mode
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
