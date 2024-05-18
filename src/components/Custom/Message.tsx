import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from './Avatar';

interface Props {
      text: string;
      role?: string;
}
function getColorByRole(role?: string) {
      switch (role) {
            case 'Admin':
                  return 'red';
            case 'Moderator':
                  return 'blue';
            case 'User':
                  return 'green';
            default:
                  return 'white';
      }
}
const Message: React.FC<Props> = ({ text, role }) => {
      return (
            <View className='flex-row pr-2 mb-4'>
                  <View style={styles.avatar_box}>
                        <Avatar alertOnline={false} />
                  </View>
                  <View style={styles.container}>
                        <View style={styles.user_info}>
                              <Text style={[styles.username, { color: getColorByRole(role) }]}>Hilverton</Text>
                              <Text style={styles.hour}>Today 13:16</Text>
                        </View>
                        <Text style={styles.message_body}>
                              {text}
                        </Text>
                  </View>
            </View>
      );
};
const styles = StyleSheet.create({
      message: {
            flexDirection: 'row',
            marginBottom: 15,
            paddingRight: 10,
      },
      container: {
            flex: 1,
      },
      avatar_box: {
            width: 57,
            marginTop: 3,
            alignItems: 'center'
      },
      user_info: {
            flexDirection: 'row',
            alignItems: 'baseline',
      },
      username: {
            fontSize: 15,
            marginRight: 7,
      },
      hour: {
            fontSize: 12,
            color: 'grey',
      },
      message_body: {
            marginTop: 5,
            color: 'white',
            fontSize: 14,
      },
});
export default Message;