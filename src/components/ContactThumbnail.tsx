import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextStyle } from 'react-native';

interface ContactThumbnailProps {
  name?: string;
  avatar?: string;
  phone?: string;
  onPress?: () => void;
  textColor?: string;
}

const ContactThumbnail = ({
  name,
  phone,
  avatar,
  textColor,
  onPress,
}: ContactThumbnailProps) => {
  const colorStyle: TextStyle = {
    color: textColor || 'white',
  };

  const ImageComponent: React.ComponentType<any> = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      <ImageComponent onPress={onPress}>
        <Image
          source={{
            uri: avatar || '',
          }}
          style={styles.avatar}
        />
      </ImageComponent>
      {name && (
        <Text style={[styles.name, colorStyle]}>{name}</Text>
      )}
      {phone && (
        <View style={styles.phoneSection}>
          <Icon name="phone" size={16} style={{ color: textColor || 'white' }} />
          <Text style={[styles.phone, colorStyle]}>{phone}</Text>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: 'white',
    borderWidth: 2,
  },
  name: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  phoneSection: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactThumbnail;
