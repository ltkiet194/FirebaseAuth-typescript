import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface Props {
  isOnline?: boolean;
  alertOnline?: boolean;
}


export default function Avatar(props: Props) {
  const { isOnline, alertOnline } = props;
  return (
    <View style={styles.avatar}>
      <Image source={require('../../../assets/discord.png')} style={{ width: 25, height: 25 }} />
      {alertOnline && (
        <View
          style={[styles.ball, { backgroundColor: isOnline ? 'green' : 'red' }]}
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
