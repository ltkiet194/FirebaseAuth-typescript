import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';

interface Props {
      text: string;
      isLoading?: boolean;
      onPress: () => void;
      color?: string;
}

const ButtonComponent = (props: Props) => {
      const { text, onPress, color, isLoading } = props;

      return (
            <TouchableOpacity
                  onPress={onPress}
                  disabled={isLoading}
                  style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: color ? color : isLoading ? colors.gray : colors.blue,
                        padding: 14,
                        borderRadius: 14,
                  }}>
                  {isLoading ? (
                        <ActivityIndicator />
                  ) : (
                        <TextComponent
                              text={text}
                              flex={0}
                              style={{ textTransform: 'uppercase' }}
                              styled='text-lg'
                        />
                  )}
            </TouchableOpacity>
      );
};

export default ButtonComponent;