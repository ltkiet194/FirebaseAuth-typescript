/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {TextInput} from 'react-native-paper';

const AppInput = ({placeholder,updateInputval,name,value,secure}:any) => {
    const [focused, setFocused] = useState<boolean>(false);

    const changeValue= (e:any) => {
        updateInputval(e,name);
    }
    return (       
            <TextInput
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholderTextColor={'#626262'}
                    onChangeText={(e)=> changeValue(e)}
                    placeholder={placeholder}
                    value={value}
                    secureTextEntry={secure?secure:false}
                    className={`p-2 bg-blue-100 rounded-lg my-2 border-2 border-gray-300 ${focused ? 'border-orange-500 shadow-md' : ''}`}
                    />

    
    );
}

export default AppInput;
