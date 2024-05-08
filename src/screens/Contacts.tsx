import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactListItem from '../components/ContactListItem';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface Contact {
    name: string;
    avatar: string;
    phone: string;
}

interface ContactsProps {
    navigation: NavigationProp<ParamListBase>;
}

const Contacts: React.FC<ContactsProps> = ({ navigation }) => {
    const [contacts, setContacts] = useState < Contact[] > ([]);
    const [loading, setLoading] = useState < boolean > (true);
    const [error, setError] = useState < boolean > (false);

    useEffect(() => {
        const loadContacts = async () => {
            try {
                const fetchedContacts: Contact[] = await fetchContacts();
                setContacts(fetchedContacts);
                setLoading(false);
                setError(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        };

        loadContacts();
    }, []);

    const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));

    const renderContact = ({ item }: { item: Contact }) => {
        const { name, avatar, phone } = item;
        return (
            <ContactListItem
                name={name}
                avatar={avatar}
                phone={phone}
                onPress={() => navigation.navigate('Profile', { contact: item })}
            />
        );
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color="blue" size="large" />}
            {error && <Text>Error...</Text>}
            {!loading && !error && (
                <FlatList
                    data={contactsSorted}
                    keyExtractor={(item) => item.phone}
                    renderItem={renderContact}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default Contacts;
