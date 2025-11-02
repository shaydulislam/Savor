import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function Home() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
<<<<<<< HEAD
      <Text>Work In Progress!</Text>
=======
      <Text>Open up 'src/App.tsx' to start working on your app!</Text>
>>>>>>> fad4e52 (Initial commit)
      <Button screen="Profile" params={{ user: 'jane' }}>
        Go to Profile
      </Button>
      <Button screen="Settings">Go to Settings</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
