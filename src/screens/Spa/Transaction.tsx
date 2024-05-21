import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../../context';

const Orders = (item: any) => {
  const ref = firestore().collection('ORDERSERVICES');
  const handleAceptStatusOrder = async () => {
    const updateStatusOrder = {
      status: 1
    };
    await ref.doc(item.id).update(updateStatusOrder);
  }

  const handleCancelStatusOrder = async () => {
    const updateStatusOrder = {
      status: 2
    };
    await ref.doc(item.id).update(updateStatusOrder);
  }
  return (
    <View style={styles.item} >
      <View style={{ justifyContent: 'space-between' }}>
        {item.status === 0 &&
          <View className='flex-row justify-center gap-2 mb-1'>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleCancelStatusOrder}>
              <Text style={{ color: 'white' }}>Deny</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleAceptStatusOrder}>
              <Text style={{ color: 'white' }}>Accept</Text>
            </TouchableOpacity>
          </View>
        }
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Khách hàng: </Text>
            <Text style={{ fontSize: 16 }}>{item.username}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Yêu cầu dịch vụ: </Text>
            <Text style={{ fontSize: 16 }}>{item.servicename}</Text>
          </View>

        </View>

        <View className='flex-row'>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Status</Text>
          <Text className='ml-2'
            style={{ fontSize: 16, fontWeight: 'bold', color: item.status === 0 ? 'orange' : item.status === 1 ? 'green' : 'red' }}>
            {item.status === 0 ? 'Pending...' : item.status === 1 ? 'Ready Go!' : 'Denied'}
          </Text>

        </View>

      </View>


    </View>
  );
};

const Transaction = ({ navigation }: any) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = firestore().collection('ORDERSERVICES');
  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate("Login");
      return;
    }

    const unsubscribe = ref.onSnapshot(querySnapshot => {
      const list: any = [];
      querySnapshot.forEach(doc => {
        const { email, idservice, servicename, timeorder, username, status } = doc.data();
        list.push({
          id: doc.id,
          email,
          idservice,
          servicename,
          timeorder,
          username,
          status
        });
      });
      setOrders(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userLogin, navigation]);

  if (loading) {
    return null;
  }
  return (
    <View style={{ paddingHorizontal: 15 }}>
      <Text style={styles.title}>Order Services</Text>
      <FlatList
        style={{ marginTop: 10 }}
        data={orders}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <Orders {...item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {

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
    marginTop: 20,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  button: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5
  }
});

export default Transaction