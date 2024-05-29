import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface Props {
  isOnline?: boolean;
  alertOnline?: boolean;
  avatar?: string;
  width: number;
  height: number;
}


export default function Avatar(props: Props) {
  const { isOnline, alertOnline, avatar, width, height } = props;
  return (
    <View style={styles.avatar}>
      {avatar ?
        (<Image resizeMode='contain' source={{ uri: avatar }} style={{ width: width, height: height, borderRadius: 20 }} />) :
        <Image source={require('../../../assets/discord.png')} style={{ width: 25, height: 25 }} />}

      {alertOnline && (
        <View
          style={[styles.ball, { backgroundColor: isOnline ? 'green' : 'grey' }]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: 'green',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderColor: '#2f3136',
    borderWidth: 2,
    position: 'absolute',
    right: -2,
    bottom: -2,
  },
});
