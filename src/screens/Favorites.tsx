import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, ListRenderItem } from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactThumbnail from '../components/ContactThumbnail';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  favorite: boolean;
}

interface FavoritesProps {
  navigation: NavigationProp<ParamListBase>;
}

const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const fetchedContacts: Contact[] = await fetchContacts();
        setContacts(fetchedContacts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    loadContacts();
  }, []);

  const renderFavoriteThumbnail: ListRenderItem<Contact> = ({ item }) => {
    const { avatar } = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      />
    );
  };

  const favorites: Contact[] = contacts.filter((contact) => contact.favorite);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={favorites}
          keyExtractor={(item: Contact, index: number) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
});

export default Favorites;
