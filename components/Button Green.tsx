import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
};

// style for DISCU button
export default function Button({ label, theme, onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
        ]}>
        <Pressable style={[styles.button, { backgroundColor: '#00FFB7' }]} onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color="000000" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '000000' }]}>{label}</Text>
        </Pressable>
      </View>
    );  
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button}  onPress={onPress} >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    height: 80,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 10,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 20,
  },
});
