/* eslint-disable prettier/prettier */
import React, { ReactNode, useState } from 'react';
import { TextInput } from 'react-native-paper';

interface Props {
      placeholder: string;
      updateInputval: (e: any, name: string) => void;
      onPress?: () => void;
      left?: ReactNode;
      right?: ReactNode;
      name: string;
      value: string;
      secure?: boolean;
      type?: string;
      styled?: string;
      onChangeText?: (e: any) => void;

}
const InputComponent = (props: Props) => {
      const { placeholder, updateInputval, name, value, secure, type, left, right, styled, onPress, onChangeText } = props;
      const [focused, setFocused] = useState<boolean>(false);
      const changeValue = (e: any) => {
            updateInputval(e, name);
      }
      return (
            <TextInput
                  left={left}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholderTextColor={'#626262'}
                  onChangeText={onChangeText}
                  underlineStyle={{ display: 'none' }}
                  secureTextEntry={secure ? secure : false}
                  className={`${styled}`}
                  right={right}
                  onPress={() => onPress ? onPress() : undefined}
                  {...props}
            />
      );
}

export default InputComponent;