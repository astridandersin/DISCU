import { StyleSheet, View } from 'react-native'; // Removed FontAwesome

import { Text } from 'react-native'; // Removed TextInput, keeping Text

type Props = {
  label: string; // This will be the content displayed in the text box
  theme?: 'primary';
};

export default function InfoTextBox({ label, theme }: Props) { // Renamed component to InfoTextBox
  return (
    <View
      style={[
        styles.infoTextBoxContainer, // Uses buttonContainer styles
        theme === 'primary' && { borderColor: '#000000', borderWidth: 2 }, // Apply primary theme border
      ]}>
      <View
        style={[
          styles.infoTextBox, // Uses button styles
          theme === 'primary' && { backgroundColor: '#FFFF' }, // Apply primary theme background
        ]}
      >
        <Text
          style={[
            styles.infoTextBoxLabel, // Uses buttonLabel styles for text appearance
            theme === 'primary' && { color: '#000000' }, // Apply primary theme text color
          ]}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoTextBoxContainer: { // Renamed from textBoxContainer
    width: 300,
    height: 90,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: '#25292e', // Example default border for non-primary theme
    borderWidth: 4,
    borderRadius: 18,
  },
  infoTextBox: { // Renamed from textBox
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff', // Default background for non-primary theme
  },
  infoTextBoxLabel: { // Renamed from textBoxLabel
    color: '#fff', // Default text color for non-primary theme
    fontSize: 17,
    textAlign: 'center', // Center text horizontally
    flexShrink: 1, // Allow text to shrink if it's too long
  },
});