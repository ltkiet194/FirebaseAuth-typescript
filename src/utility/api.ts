import React from 'react';
import 'react-native-get-random-values';
import { v4 as idv4 } from 'uuid';

interface Contact {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    cell: string;
    email: string;
    favorite: boolean;
}

const mapContact = (contact: any) => {
    const {
        name, picture, phone, cell, email,
    } = contact;

    return {
        id: idv4(),
        name: `${name.first} ${name.last}`,
        avatar: picture.large,
        phone,
        cell,
        email,
        favorite: Math.random() >= 0.5,
    };
};

const fetchContacts = async () => {
    const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
    const contactData = await response.json();
    return contactData.results.map((contact: any) => mapContact(contact));
};

const fetchUserContact = async () => {
    const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
    const userData = await response.json();
    return mapContact(userData.results[0]);
};

const fetchRandomContact = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const userData = await response.json();
    return mapContact(userData.results[0]);
};

export { fetchContacts, fetchUserContact, fetchRandomContact, type Contact };
