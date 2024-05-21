import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useMyContextController } from '../../context'

const UserItem = ({ name, address, phone, email }: any) => (
  <View style={styles.userContainer}>
    <View style={styles.column}>
      <View style={styles.row}>
        <Text style={styles.boldText}>Tên: </Text>
        <Text>{name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Địa chỉ: </Text>
        <Text>{address}</Text>
      </View>
    </View>
    <View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Điện thoại: </Text>
        <Text>{phone}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Email: </Text>
        <Text>{email}</Text>
      </View>
    </View>
  </View>
);


const CustomerService = ({ navigation }: any) => {
  const ref = firestore().collection('USERS').where('role', '==', 'customer');
  const [{ userLogin }, dispatch] = useMyContextController();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate("Login");
      return;
    }

    const unsubscribe = ref.onSnapshot(querySnapshot => {
      const list: any = [];
      querySnapshot.forEach(doc => {
        const { name, email, address, phone } = doc.data();
        list.push({
          id: doc.id,
          name,
          email,
          address,
          phone
        });
      });
      setUsers(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userLogin, navigation]);

  if (loading) {
    return null;
  }
  return (
    <View style={{ padding: 15 }}>
      <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>List Customers</Text>
      <ScrollView style={{ marginTop: 10 }}>
        {users.map((user: any) => (
          <UserItem key={user.id} {...user} />
        ))}
      </ScrollView>
    </View >
  )
}
const styles = StyleSheet.create({
  userContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CustomerService