import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DetailListItem from '../components/DetailListItem';

const Options = () => {
  return (
    <View className='flex-1 bg-white'>
      <DetailListItem title="Update Profile" />
      <DetailListItem title="Change Language" />
      <DetailListItem title="Sign Out" />
    </View>
  );
}

export default Options;
