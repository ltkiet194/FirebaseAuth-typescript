import { View, Text } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';

interface Props {
      text: string;
      styled?: string;
}

const TitleComponent = (props: Props) => {
      const { text, styled } = props;
      return (
            <TextComponent styled={styled} text={text} />
      );
};

export default TitleComponent;