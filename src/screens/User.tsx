import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import colors from '../utility/colors';
import { fetchUserContact, Contact } from '../utility/api';

const User: React.FC = () => {
  const [user, setUser] = useState<Contact | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData: Contact = await fetchUserContact();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View className='items-center justify-center flex-1 bg-blue-500'>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  if (error) {
    return (
      <View className='items-center justify-center flex-1 bg-blue-500'>
        <Text className='text-xl '>Error...</Text>
      </View>
    );
  }
  if (!user) {
    return null;
  }

  const { avatar, name, phone } = user;
  return (
    <View className='items-center justify-center flex-1 bg-slate-600'>
      <ContactThumbnail avatar={avatar} name={name} phone={phone} />
    </View>
  );
};


export default User;
