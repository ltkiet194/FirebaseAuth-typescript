import React from 'react';
import { View } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';


const Profile = ({route}:any) => {
    const {contact} = route.params;
    
    const {avatar, name, email, phone, cell} = contact;
    return (
        <View className='flex-1'>
            <View className='items-center justify-center flex-1 bg-blue-300'>
                <ContactThumbnail avatar={avatar} name={name} phone={phone} />
            </View>
            <View className='flex-1 bg-pink-200'>
                <DetailListItem icon="mail" title="Email" subtitle={email}></DetailListItem>
                <DetailListItem icon="phone" title="Work" subtitle={phone}></DetailListItem>
                <DetailListItem icon="smartphone" title="Personal" subtitle={cell}></DetailListItem>
            </View>
        </View>
    );
}

export default Profile;

