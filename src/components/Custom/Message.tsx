import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from './Avatar';
import { formatFirebaseTimestamp, getColorByRole } from '../../constants/util';
import { useSelector } from 'react-redux';

interface Props {
      message: any;
      member?: any;
      User?: any;
}
const Message: React.FC<Props> = (props: Props) => {
      const { message, member, User } = props;
      const { content, timeStamp } = message;

      return (
            <View className='flex-row pr-2 mb-2 bg-[#2B2D31] mx-2 rounded-xl'>
                  <View className='items-center mt-1 w-14'>
                        <Avatar height={35} width={35} alertOnline={false} avatar={User ? User.image : ''} />
                  </View>
                  <View className='flex-1 py-1'>
                        <View className='flex-row items-baseline justify-between'>
                              <Text className='text-sm font-bold text-white'
                                    style={[{ color: getColorByRole(member ? member.role : '') }]}>
                                    {User ? User.name : ''}
                              </Text>
                              <Text className='text-xs text-[#949AA4]'>{timeStamp ? formatFirebaseTimestamp(timeStamp) : ''}</Text>
                        </View>
                        <Text className='mt-1 text-sm text-white'>
                              {content}
                        </Text>
                  </View>
            </View>
      );
};

export default Message;