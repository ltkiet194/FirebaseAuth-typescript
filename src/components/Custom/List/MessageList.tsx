import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Message from '../Message';
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

interface Message {
      uid: string;
      content: string;
      userId: string;
}

interface Member {
      role: string;
}

const MessageList: React.FC = () => {
      const messages: any[] = useSelector((state: any) => state.server.Message);
      const currentServer = useSelector((state: any) => state.MainApp.currentServer);
      const Servers = useSelector((state: any) => state.MainApp.servers);
      const userInfos = useSelector((state: any) => state.MainApp.userInfos);
      if (!currentServer) return (
            <View>
                  <Text>No Channel Selected</Text>
            </View>
      );
      return (
            <GestureHandlerRootView className='flex-1 bg-[#313338]'>
                  {messages.length > 0 ? (
                        <FlatList
                              data={messages}
                              renderItem={({ item }) => (

                                    <View key={item.uid}>
                                          <Message
                                                message={item}
                                                member={
                                                      Servers ? Servers.get(currentServer).members.get(item.userId) : 'User'}
                                                User={userInfos ? userInfos.get(item.userId) : null}
                                          />
                                    </View>
                              )}
                              keyExtractor={item => item.uid.toString()}
                              inverted
                        />
                  ) : (
                        <Text>No Channel Selected</Text>
                  )}
            </GestureHandlerRootView>
      );
};


export default MessageList;
