import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {io} from 'socket.io-client'
const SERVER_ADD = 'http://192.168.0.13:3000/hallcall'
const socket = io(SERVER_ADD, {
  transports: ["websocket"],
})
socket.on("connect", () => {
  console.log(socket.id)
})
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
