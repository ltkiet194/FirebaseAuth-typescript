import { View, Text, StyleProp, TextStyle } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../constants/colors';

interface Props {
      text: string;
      size?: string;
      font?: string;
      color?: string;
      flex?: number;
      style?: StyleProp<TextStyle>;
      styled?: string;
}

const TextComponent = (props: Props) => {
      const { text, font, size, color, flex, styled, style } = props;

      return (
            <Text className={`flex-1 text-sm text-white ${styled}`} style={style}>
                  {text}
            </Text>
      );
};

export default TextComponent;