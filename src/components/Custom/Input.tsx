
import { Add, Send } from 'iconsax-react-native';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function Input() {
      const [input, setInput] = useState('');

      function submit() {
            if (!input) return;
            setInput('');
      }
      return (
            <View style={styles.input_field}>
                  <TouchableOpacity>
                        <Add size={30} color="black" className='bg-white rounded-full' />

                  </TouchableOpacity>
                  <TextInput
                        style={styles.input}
                        blurOnSubmit
                        placeholder="Conversar em #REACT JS"
                        placeholderTextColor="grey"
                        value={input}
                        onChangeText={text => setInput(text)}
                  />
                  <View style={styles.icons} className='justify-end p-2'>
                        <TouchableOpacity>
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
      },
});