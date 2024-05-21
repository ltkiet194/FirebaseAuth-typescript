import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../../context';
import { AddCircle } from 'iconsax-react-native';

function formatterVND(value: any) {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
const Services = (item: any) => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity style={styles.item} onPress={() => {
      navigation.navigate('ServiceDetail', { item })
    }}>
      <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>{item.servicename}</Text>
      <Text className='text-sm font-bold text-red-500'>{`Price: ${formatterVND(item.price)}`}</Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  const navigation: any = useNavigation();
  const [{ userLogin }, dispatch] = useMyContextController();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = firestore().collection('SERVICES');

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate("Login");
      return;
    }

    const unsubscribe = ref.onSnapshot(querySnapshot => {
      const list: any = [];
      querySnapshot.forEach(doc => {
        const { servicename, price, imageUrl, finalUpdate } = doc.data();
        list.push({
          id: doc.id,
          servicename,
          price,
          imageUrl,
          finalUpdate
        });
      });
      setServices(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userLogin, navigation]);

  if (loading) {
    return null;
  }

  return (
    <View className='p-2'>
      <Image resizeMode='contain' source={require('../../../assets/logo.png')} className='self-center' />
      <View style={styles.header}>
        <Text style={styles.title}>List Services</Text>
        {userLogin?.role != 'customer' && <AddCircle size={40} color="tomato" onPress={() => navigation.navigate('AddNewService')} />}
      </View>
      <FlatList
        style={{ marginTop: 10 }}
        data={services}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => <Services {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    marginBottom: 8,
    borderRadius: 8
  },
  logo: {
    resizeMode: "cover",
    width: 320,
    height: 50,
    alignSelf: 'center',
    marginVertical: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  }
});

export default Home