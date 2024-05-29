import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Add, Send } from 'iconsax-react-native'; // Đảm bảo import iconsax-react-native
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../store/serverSlice';

export default function Input() {
      const [input, setInput] = useState('');
      const dispatch = useDispatch<any>();
      const ActiveChannel = useSelector((state: any) => state.server.ActiveChannel);
      function submit() {
            if (!input) return;
            setInput('');
      }
      const handleKeyPress = () => {
            if (!input || !ActiveChannel) return;
            const param = {
                  message: input,
                  channelId: ActiveChannel.uid,
            };
            dispatch(sendMessage(param));
            setInput('');
      }

      return (
            <View style={styles.input_field}>
                  <TouchableOpacity>
                        <Add size={30} color="black" style={{ backgroundColor: 'white', borderRadius: 30 }} />
                  </TouchableOpacity>
                  <TextInput
                        style={styles.input}
                        blurOnSubmit
                        multiline
                        placeholder="Messages"
                        placeholderTextColor="grey"
                        value={input}
                        onChangeText={text => setInput(text)}
                        onFocus={() => console.log('Focused')}
                        onSubmitEditing={handleKeyPress}
                  />
                  <View style={styles.icons}>
                        <TouchableOpacity onPress={handleKeyPress}>
                              <Send size={22} color="white" />
                        </TouchableOpacity>
                  </View>
            </View>
      );
}

const styles = StyleSheet.create({
      input_field: {
            height: 45,
            paddingHorizontal: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopColor: 'rgba(0,0,0,0.1)',
            borderTopWidth: 1,
      },
      input: {
            flex: 1,
            marginLeft: 6,
            marginRight: 5,
            padding: 5,
            color: 'white',
            backgroundColor: '#36393f',
            borderRadius: 10,
      },
      icons: {
            flexDirection: 'row',
            justifyContent: 'flex-end', // Sửa lại đây để căn chỉnh các icon về phía cuối
      },
});
