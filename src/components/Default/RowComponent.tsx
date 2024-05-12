import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { globalStyles } from '../../styles/globalStyles';

interface Props {
      children: ReactNode;
      styled?: string;
      styles?: StyleProp<ViewStyle>;
      onPress?: () => void;
}

const RowComponent = (props: Props) => {
      const { children, onPress, styled, styles } = props;
      return onPress ? (
            <TouchableOpacity className={`flex-1 flex-row items-center ${styled}`}
                  onPress={onPress ? () => onPress() : undefined}
                  style={styles}
            >
                  {children}
            </TouchableOpacity>
      ) : (
            <View className={`flex-row  justify-start ${styled}`}>{children}</View>
      );
};

export default RowComponent;