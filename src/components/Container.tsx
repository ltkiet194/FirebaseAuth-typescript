import { View, Text, ScrollViewComponent, ScrollView, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import { useNavigation } from '@react-navigation/native';

interface Props {
      title?: string;
      back?: boolean;
      right?: ReactNode;
      children?: ReactNode;
      styled?: string;
      isScroll?: boolean;
}

const Container = (props: Props) => {
      const { title, back, right, children, isScroll, styled } = props;

      const navigation: any = useNavigation();
      return (
            <View className={`flex-col flex-1 ${styled}`}>
                  <RowComponent styled={`flex-1 flex-row justify-between items-center`}>
                        {back && (
                              <TouchableOpacity onPress={() => navigation.goBack()}>
                              </TouchableOpacity>
                        )}
                        <View style={{ flex: 1, zIndex: -1 }}>
                              {title && (
                                    <TextComponent
                                          flex={0}
                                          text={title}
                                          styled={`text-center ${styled}`}
                                    />
                              )}
                        </View>
                  </RowComponent>
                  {isScroll ? (
                        <ScrollView style={{ flex: 1, flexGrow: 1 }}>{children}</ScrollView>
                  ) : (
                        <View style={{ flex: 1 }}>{children}</View>
                  )}
            </View>
      );
};
export default Container