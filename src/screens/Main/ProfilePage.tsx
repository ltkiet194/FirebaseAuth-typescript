import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { Image } from 'react-native';
import { Activity, AlignLeft, HashtagSquare, Information, Logout, Message2, PenTool, Profile, Security }
      from 'iconsax-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/userSlice';
import { setModalAccount } from '../../store/modalSlice';
import { ActivityIndicator } from 'react-native-paper';

const ProfilePage = ((props: any) => {
      const dispatch = useDispatch<any>();
      const infoUser = useSelector((state: any) => state.user.infoUser);

      return infoUser ? (
            <View className='flex-1 bg-[#111214]'>
                  <View style={{ height: 90, width: '100%' }} className='bg-[#5574b1]' />
                  <View className='bg-[#2B2D31]'
                        style={{
                              flexDirection: 'row', paddingHorizontal: 20,
                              alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 60
                        }}>
                        <View
                              style={{ alignItems: 'center', position: 'relative' }} >
                              <View className='bg-gray-400'
                                    style={{ padding: 10, width: 120, height: 120, borderRadius: 70, position: 'absolute', top: -120, left: 0 }}>
                                    <View style={{ width: 100, height: 100, borderRadius: 50, overflow: 'hidden' }}>
                                          <Image className='w-full h-full'
                                                source={{ uri: infoUser.image }} />
                                    </View>
                              </View>
                              <View style={{ paddingLeft: 10 }} >
                                    <Text style={{ fontSize: 30, fontWeight: 'bold' }} className='text-white'>{infoUser.name}</Text>
                                    <Text className='text-white'>{infoUser.name}{infoUser.tag}</Text>
                              </View>
                        </View>
                        <TouchableOpacity style={{ height: 40, width: 55, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                              <HashtagSquare size={30} color='white' />
                        </TouchableOpacity>
                  </View>
                  <View className='bg-[#2B2D31]'
                        style={{ height: 70, justifyContent: 'flex-end', paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Text className='text-white'
                              style={{ fontWeight: 'bold', fontSize: 16 }}>Cài đặt tài khoản</Text>
                  </View>
                  <ListComp title='Tài khoản' callbackFn={() => { dispatch(setModalAccount(true)) }}
                        icon={<Profile size={30} color='white' style={{ opacity: .8 }} />} />
                  <ListComp title='Thông tin' icon={<PenTool size={30} color='white' style={{ opacity: .8 }} />} />
                  <ListComp title='Bảo vệ tài khoản' icon={<Security size={30} color='white' />} />
                  <ListComp callbackFn={() => { props.navigation.navigate('Display'); }}
                        title='Hiển thị' icon={<Profile size={30} color='white' style={{ opacity: .8 }} />} />
                  <ListComp title='Tặng Nitro' icon={<Message2 size={30} color='white' style={{ opacity: .9 }} />} />
                  <ListComp title='Hỗ trợ' icon={<Information size={30} color='white' style={{ opacity: .8 }} />} />
                  <TouchableOpacity onPress={() => dispatch(logoutUser())}
                        className='flex-row items-center justify-center bg-slate-50 rounded-xl'>
                        <Text className='p-2 m-2 text-lg font-bold text-red-600'>Đăng Xuất</Text>
                        <Logout size={30} color='red' />
                  </TouchableOpacity>
            </View>
      ) : <ActivityIndicator size='large' color='white' />
})

const ListComp = React.memo(({ title, icon, callbackFn }: { title: string, icon: any, callbackFn?: Function }) => {
      return (
            <TouchableOpacity className='bg-[#2B2D31]'
                  onPress={() => callbackFn?.()}
                  style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}
            >
                  <View>
                        {icon}
                  </View>
                  <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                        <Text className='text-white'
                              style={{ fontSize: 18, fontWeight: '600' }}>
                              {title}
                        </Text>
                        <AlignLeft width={30} height={30} />
                  </View>
            </TouchableOpacity>
      )
})

export default ProfilePage