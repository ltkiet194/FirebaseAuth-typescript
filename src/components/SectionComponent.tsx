import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface Props {
      children: ReactNode;
      styled?: string;
}
const SectionComponent = (props: Props) => {
      const { children, styled } = props;
      return <View className={styled}>{children}</View>;
};

export default SectionComponent;