import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {io} from 'socket.io-client'
const SERVER_ADD = 'http://192.168.0.13:3000/hallcall'
const socket = io(SERVER_ADD, {
  transports: ["websocket"],
})
// socket.on("connect", () => {
//   console.log(socket.id)
// })
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={[styles.callbutton,{width:300,height:300,borderWidth:1,borderRadius:150,
      backgroundColor:'#371100'}]}>
        <View style={[styles.callbutton,{width:200,height:200,borderWidth:1,borderRadius:100,
        backgroundColor:'#161616'}]}>
          <View style={{position:'absolute',width:20,height:20,borderRadius:10,top:20,
          backgroundColor:'white'}}></View>
          <View style={[styles.callbutton,{width:100,height:100,borderWidth:2,borderRadius:50,
          borderColor:'white'}]}>
            <Text style={{fontSize:30,color:'white'}}>호출</Text>
          </View>
        </View>
      </View>
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
  callbutton: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
