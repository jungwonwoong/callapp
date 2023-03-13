import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import * as Battery from 'expo-battery'
import { StyleSheet, Text, View, TouchableOpacity, AppState } from 'react-native';
import {io} from 'socket.io-client'
const SERVER_ADD = 'http://자신의 서버 ip:3000/hallcall'
const socket = io(SERVER_ADD, {
  transports: ["websocket"],
})

var btnOff = false
export default function App() {
  const [LEDc, setLEDc] = useState('white')
  useEffect(() => {
    const appStateListener=AppState.addEventListener('change', nextAppState => {
      if(nextAppState == 'background')
        socket.emit('sendcall', '호출신호보냄')
    })
    return () => {
      appStateListener.remove()
    }
  })
  useEffect(() => {
    const plugStateListener = Battery.addBatteryStateListener(({ batteryState }) => {
      if(batteryState == 1)
        socket.emit('sendcall', '호출신호보냄')
    })
    return () => {
      plugStateListener.remove()
    }
  })
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={[styles.callbutton,{width:300,height:300,borderWidth:2,borderRadius:150,
      backgroundColor:'#371100'}]}>
        <View style={[styles.callbutton,{width:200,height:200,borderWidth:2,borderRadius:100,
        backgroundColor:'#161616'}]}>
          <View style={{position:'absolute',width:20,height:20,borderRadius:10,top:20,
          backgroundColor:LEDc}}></View>
          <TouchableOpacity onPress={()=> {
            btnOff = true
            setLEDc('red');
            setTimeout(()=>{
              btnOff=false
              setLEDc('white')
            },3000)
            socket.emit('sendcall', '호출신호보냄')
          }}
          disabled={btnOff}
          style={[styles.callbutton,{width:100,height:100,borderWidth:2,borderRadius:50,
          borderColor:'white'}]}>
            <Text style={{fontSize:30,color:'white'}}>호출</Text>
          </TouchableOpacity>
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
