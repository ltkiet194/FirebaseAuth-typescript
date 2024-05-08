import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import colors from '../utility/colors';

interface ContactListItemProps {
  name: string;
  avatar: string;
  phone: string;
  onPress?: () => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({
  name,
  avatar,
  phone,
  onPress,
}) => {
  return (
    <TouchableHighlight
      underlayColor={colors.grey}
      onPress={onPress}
      className='border-b border-b-[#ddd2d2] bg-blue-200'
    >
      <View className='flex-row items-center px-4 py-2'>
        <Image source={{ uri: avatar }} className='mr-4 w-14 h-14 rounded-3xl' />
        <View className='flex-1'>
          <Text className='text-lg font-bold'>{name}</Text>
          <Text className='text-lg text-[#555]'>{phone}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};


export default ContactListItem;