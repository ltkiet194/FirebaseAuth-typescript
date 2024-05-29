import React from 'react';
import {
      View,
      Text,
      StatusBar,
      StyleSheet,
} from 'react-native';

import Avatar from './Avatar';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { getColorByRole } from '../../constants/util';


export default function Member() {
      const currentServer = useSelector((state: any) => state.MainApp.currentServer);
      const Servers = useSelector((state: any) => state.MainApp.servers);
      const userInfos = useSelector((state: any) => state.MainApp.userInfos);
      if (!currentServer) return (
            <View>
                  <Text>No Channel Selected</Text>
            </View>
      );
      const ThisServer = Servers.get(currentServer);
      const members = Array.from(ThisServer.members.values());
      const getUserInfo = (userId: string) => {
            return userInfos.get(userId);
      }
      return (
            <ScrollView>
                  <View style={styles.container}>
                        <View style={styles.container_topics}>
                              <View style={styles.topic_name}>
                                    <Text style={{ color: 'grey', fontSize: 15 }}>
                                          Members
                                    </Text>
                              </View>
                              {members.map((item: any) => (
                                    userInfos.get(item.userId) ?
                                          <View key={item.userId} style={styles.container_item}>
                                                <View style={styles.box_avatar}>
                                                      <Avatar height={35} width={35} alertOnline={true}
                                                            isOnline={getUserInfo(item.userId).online} avatar={getUserInfo(item.userId).image} />
                                                </View>
                                                <View className='items-start justify-start'>
                                                      <Text className='text-sm font-bold'
                                                            style={{ color: getColorByRole(item.role) }}>{getUserInfo(item.userId).name} {getUserInfo(item.userId).tag}
                                                      </Text>
                                                      <Text className='text-xs'
                                                            style={{ color: getColorByRole(item.role) }}>{`${item.role}`}
                                                      </Text>
                                                </View>

                                          </View>
                                          : null
                              ))}
                        </View>
                  </View>
            </ScrollView>
      );
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: '#2f3136',
      },
      topic: {
            backgroundColor: '#202225',
      },
      channel_topic: {
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginHorizontal: 10,
      },
      paragraph: {
            fontSize: 11,
            color: 'grey',
            marginHorizontal: 10,
            marginBottom: 10,
      },
      container_topics: {
            paddingHorizontal: 10,
      },
      topic_name: {
            height: 50,
            justifyContent: 'flex-end',
            paddingHorizontal: 10,
            paddingBottom: 5,
            backgroundColor: '#2f3136',
      },
      container_item: {
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            paddingHorizontal: 10,
      },
      box_avatar: {
            width: 50,
      },
});
